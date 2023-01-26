import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import ChatInputForm from "../Components/ChatInputForm";
import ChatMessage from "../Components/ChatMessage";
import NewChatButton from "../Components/NewChatButton";
import Hero from "../Components/Hero";
import GoogleAuthButtons from "../Components/GoogleAuthButtons";
import MessageHistory from "../Components/MessageHistory";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref, push } from "firebase/database";
import StoreButton from "../Components/StoreButton";
import "./MainPage.css";
import Disclaimer from "../Components/Disclaimer";
import TemperatureSlider from "../Components/TemperatureSlider";
import SignUpHeading from "../Components/SignUpHeading";
import NotSubscribedHeading from "../Components/NotSubscribedHeading";

function MainPage({ app, db }) {
  const provider = new GoogleAuthProvider(app);
  const auth = getAuth(app);
  const firestoreDB = getFirestore(app);

  const [user, setUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleNewChat() {
    if (user) {
      setConversationId(user.uid + Date.now());
    }
  }

  function handleLogin() {
    setIsLoggingIn(true);
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      setUser(user);
      setConversationId(user.uid + Date.now());
      loadSubscription();
    });
  }, []);

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [temperature, setTemperature] = useState(0.5);
  const [isLoading, setIsLoading] = useState(null);

  function clearChat() {
    setChatLog([]);
  }

  function clearInput() {
    setInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const chatRef = ref(db, `messages/${user.uid}/${conversationId}`);
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];

    if (user) {
      push(chatRef, {
        user: "me",
        message: input,
        timestamp: Date.now(),
      })
        .then(() => {})
        .catch((error) => {
          console.log("The write failed...", error);
        });
    }

    clearInput();
    setChatLog(chatLogNew);
    setIsLoading(true);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch(
      "https://chat-gpt-enhanced-backend.herokuapp.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messages,
          temperature: temperature,
        }),
      }
    );

    const data = await response.json();
    if (user) {
      push(chatRef, {
        user: "gpt",
        message: data.message,
        timestamp: Date.now(),
      })
        .then(() => {})
        .catch((error) => {
          console.log("The write failed...", error);
        });
    }

    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    setIsLoading(false);
  }

  // Get users subscription data
  const [subscription, setSubscription] = useState(null);

  const loadSubscription = async () => {
    const sub = auth.currentUser;
    const ref = await getDocs(
      collection(firestoreDB, `customers/${sub.uid}/subscriptions`)
    );

    ref.forEach(async (doc) => {
      setSubscription({
        role: doc.data().role,
        current_period_end: doc.data().current_period_end,
        current_period_start: doc.data().current_period_start,
        ended_at: doc.data().ended_at,
      });
    });
  };

  return (
    <div className="App">
      <aside className="side-menu">
        <NewChatButton
          clearChat={clearChat}
          clearInput={clearInput}
          handleNewChat={handleNewChat}
        />
        {user && (
          <MessageHistory
            userId={user.uid}
            conversationId={conversationId}
            db={db}
          />
        )}

        <StoreButton user={user} app={app} />

        <GoogleAuthButtons
          user={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </aside>

      <section className="chat-box">
        <div className="mobile-new-chat-button">
          <NewChatButton clearChat={clearChat} clearInput={clearInput} />
        </div>

        {chatLog.length === 0 && <Hero />}

        <div className="mobile-store-button">
          {chatLog.length === 0 && <StoreButton user={user} />}
        </div>

        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isLastMessage={index === chatLog.length - 1}
            />
          ))}
          {isLoading === true && (
            <div className="circular-progress">
              <CircularProgress style={{ color: "#b3befe" }} />
            </div>
          )}
        </div>

        {/* Login button for mobile */}
        {!user && (
          <div className="mobile-login-button">
            <GoogleAuthButtons
              user={user}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          </div>
        )}

        {subscription?.role === "premium" && (
          <TemperatureSlider setTemperature={setTemperature} user={user} />
        )}

        {!user && !authLoading && (
          <SignUpHeading handleLogin={handleLogin} isLoggingIn={isLoggingIn} />
        )}
        {subscription?.role !== "premium" && user && <NotSubscribedHeading />}

        {authLoading && <CircularProgress style={{ color: "#b3befe" }} />}
        {subscription?.role === "premium" && !subscription?.ended_at && (
          <ChatInputForm
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            user={user}
            handleLogin={handleLogin}
          />
        )}

        <Disclaimer />
      </section>
    </div>
  );
}

export default MainPage;
