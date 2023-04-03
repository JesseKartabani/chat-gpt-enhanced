import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import ChatInputForm from "../Components/ChatInputForm";
import ChatMessage from "../Components/ChatMessage";
import NewChatButton from "../Components/NewChatButton";
import Hero from "../Components/Hero";
import GoogleAuthButtons from "../Components/GoogleAuthButtons";
import MessageHistory from "../Components/MessageHistory";
import BugReportModal from "../Components/BugReportModal";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref, push, get, set, update, increment } from "firebase/database";
import StoreButton from "../Components/StoreButton";
import "./MainPage.css";
import Disclaimer from "../Components/Disclaimer";
import TemperatureSlider from "../Components/TemperatureSlider";
import SignUpHeading from "../Components/SignUpHeading";
import NotSubscribedHeading from "../Components/NotSubscribedHeading";
import FreeTrial from "../Components/FreeTrial";
import ClearConversations from "../Components/ClearConversations";
import RateLimitError from "../Components/RateLimitError";
import ResponseFailedError from "../Components/ResponseFailedError";

function MainPage({ app, db }) {
  const provider = new GoogleAuthProvider(app);
  const auth = getAuth(app);
  const firestoreDB = getFirestore(app);

  const [user, setUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [hasTrial, setHasTrial] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [responseFailed, setResponseFailed] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");

  function handleNewChat() {
    if (user) {
      setConversationId(user.uid + Date.now());
    }
    clearInput();
    clearChat();
    setIsRateLimited(false);
    setResponseFailed(false);
  }

  // Redirect user to google login
  function handleLogin() {
    setIsLoggingIn(true);
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then(() => {
        console.log("Signed In");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Log user out, clear old messages and input
  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        clearInput();
        clearChat();
        setIsLoading(false);
        setIsRateLimited(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Check if a user has had a free trial and create one in database if they haven't
  const handleTrialPeriod = (user) => {
    const userRef = ref(db, `trials/${user.uid}`);

    get(userRef).then((snapshot) => {
      if (snapshot.val() === null) {
        // create a new user document with the createdAt timestamp
        set(userRef, {
          createdAt: Date.now(),
        })
          .then(() => {
            console.log("Trial Started");
            checkTrialExpired(user);
          })
          .catch((error) => {
            console.log("The write failed...", error);
          });
      }
    });
  };

  // Checks if user has free trial time
  const checkTrialExpired = async (user) => {
    if (!user) return;

    const userRef = ref(db, `trials/${user.uid}`);

    get(userRef).then((snapshot) => {
      if (snapshot.val() === null) return;

      const trialData = snapshot.val();
      const createdAt = trialData.createdAt;
      const now = Date.now();

      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const trialDuration = now - createdAt;

      // Return true if the trial has not yet expired (is less than one day old)
      if (trialDuration < oneDayInMilliseconds) {
        setHasTrial(true);
      }
    });
  };

  useEffect(() => {
    // When the authentication state changes (user logging in/out)
    onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      // Update user
      setUser(user);
      // Give new conversation id
      setConversationId(user.uid + Date.now());
      // Load users sub data
      loadSubscription();
      // Create free trial if user has never had one
      handleTrialPeriod(user);
      // Check if free trial is still active
      checkTrialExpired(user);
    });
  }, []);

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  // Default temperature is 0.5 (must match temperature sliders default value/100)
  const [temperature, setTemperature] = useState(0.5);

  // Set temperature to 0 when user swaps to codex model and 0.5 when swapping back
  useEffect(() => {
    setTemperature(selectedModel === "code-davinci-002" ? 0 : 0.5);
  }, [selectedModel]);

  function clearChat() {
    setChatLog([]);
  }

  function clearInput() {
    setInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Create reference to user's chat log in the database
    const chatRef = ref(db, `messages/${user.uid}/${conversationId}`);
    // Create reference to user's token usage in the database
    const tokenRef = ref(db, `token-usage/${user.uid}`);
    // Add user's input to the chat log
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];

    // Check if the user is logged in
    if (user) {
      // Push the user's input to the database
      push(chatRef, {
        user: "me",
        message: input,
        timestamp: Date.now(),
      })
        .then(() => {})
        // Log the error if the write failed
        .catch((error) => {
          console.log("The write failed...", error);
        });
    }

    clearInput(); // Clear the input field
    setChatLog(chatLogNew); // Set the new chat log with user's input
    setIsLoading(true);

    // Give the AI the last 5 messages for context as well as the recent input
    const lastSix = chatLogNew.slice(Math.max(chatLogNew.length - 6, 0));
    const messages = lastSix.map((message) => message.message).join("\n");

    // Fetch response from the backend
    const response = await fetch(
      "https://chat-gpt-enhanced-backend.herokuapp.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: user.uid,
        },
        // Post the last 6 messages (including the ai responses)
        // and the temperature for the current prompt
        body: JSON.stringify({
          message: messages,
          temperature: temperature,
          model: selectedModel,
        }),
      }
    ).catch((error) => {
      // Show response failed error
      setResponseFailed(true);
      setIsLoading(false);
      throw new Error("API response was not okay");
    });

    // If user hit rate limit display error
    if (response.status === 429) {
      setIsRateLimited(true);
      setIsLoading(false);
      throw new Error("Rate limit reached");
    }

    // Response was successful
    setIsRateLimited(false);
    setResponseFailed(false);

    // Get the response data in JSON format
    const data = await response.json();

    // Push the AI response to the database
    push(chatRef, {
      user: "gpt",
      message: data.message,
      timestamp: Date.now(),
    })
      .then(() => {})
      .catch((error) => {
        console.log("The write failed...", error);
      });

    // Push the token usage to the database
    update(tokenRef, {
      total_tokens_used: increment(data.token_usage),
    })
      .then(() => {})
      .catch((error) => {
        console.log("The write failed...", error);
      });

    // Set the chat log with the AI response
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    setIsLoading(false);
  }

  // Get users subscription data
  const loadSubscription = async () => {
    // Get the current user
    const sub = auth.currentUser;
    // Get the reference to the user's subscriptions
    const ref = await getDocs(
      collection(firestoreDB, `customers/${sub.uid}/subscriptions`)
    );

    // Set subscription details in state
    ref.forEach(async (doc) => {
      setSubscription({
        role: doc.data().role,
        current_period_end: doc.data().current_period_end,
        current_period_start: doc.data().current_period_start,
        ended_at: doc.data().ended_at,
        status: doc.data().status,
      });
    });
  };

  return (
    <div className="App">
      {/* Side menu (not visible on mobile) */}
      <aside className="side-menu">
        <NewChatButton handleNewChat={handleNewChat} isLoading={isLoading} />
        {/* Display message history if user is logged in */}
        {user && (
          <MessageHistory
            userId={user.uid}
            conversationId={conversationId}
            db={db}
          />
        )}

        <div className="white-buttons">
          <ClearConversations user={user} db={db} />
          <BugReportModal user={user} db={db} />
        </div>

        {/* Displays users free trial status */}
        {hasTrial && subscription?.role !== "premium" && user && <FreeTrial />}

        {/* Takes user to the store, only displayed if user is logged in */}
        <StoreButton user={user} />

        {/* Login/logout buttons */}
        {!authLoading && (
          <GoogleAuthButtons
            user={user}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        )}
      </aside>

      {/* Chat box */}
      <section className="chat-box">
        {/* New chat button for mobile only */}
        <div className="mobile-new-chat-button">
          <NewChatButton isLoading={isLoading} handleNewChat={handleNewChat} />
        </div>

        {/* Only display hero if theres no chats and if user isn't rate limited */}
        {chatLog.length === 0 && !isRateLimited && <Hero />}

        {/* Store button for mobile only */}
        <div className="mobile-store-button">
          {chatLog.length === 0 && <StoreButton user={user} />}
        </div>

        {/* Chat log (the actual messages) */}
        {!isRateLimited && (
          <div className="chat-log">
            {chatLog.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isLastMessage={index === chatLog.length - 1}
                selectedModel={selectedModel}
              />
            ))}
            {isLoading === true && (
              <div className="circular-progress">
                <CircularProgress style={{ color: "#b3befe" }} />
              </div>
            )}
          </div>
        )}

        {/* Error messages */}
        {isRateLimited && <RateLimitError />}
        {responseFailed && <ResponseFailedError />}

        {/* 
          Login button for mobile only 
          Right now its set up to only display the login button need to rework
          the ui for mobile 
        */}
        {!user && !authLoading && (
          <div className="mobile-login-button">
            <GoogleAuthButtons
              user={user}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          </div>
        )}

        {/* If user is subscribed or has trial display temperature slider */}
        {hasTrial ||
        (subscription?.role === "premium" &&
          !subscription?.ended_at &&
          !isRateLimited &&
          selectedModel === "gpt-3.5-turbo" &&
          subscription?.status !== "incomplete") ? (
          <TemperatureSlider setTemperature={setTemperature} user={user} />
        ) : null}

        {/* If the user is not signed in display sign up heading */}
        {!user && !authLoading && (
          <SignUpHeading handleLogin={handleLogin} isLoggingIn={isLoggingIn} />
        )}

        {/* If the user isn't subscribed display the visit store heading */}
        {subscription?.role !== "premium" && user && !hasTrial && (
          <NotSubscribedHeading />
        )}

        {/* Loading spinner when user is logging in */}
        {authLoading && <CircularProgress style={{ color: "#b3befe" }} />}

        {/* If the user is subscribed or has trial display the chat input form */}
        {hasTrial ||
        (subscription?.role === "premium" &&
          !subscription?.ended_at &&
          !isRateLimited &&
          subscription?.status !== "incomplete") ? (
          <ChatInputForm
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            user={user}
            handleLogin={handleLogin}
            selectedModel={selectedModel}
          />
        ) : null}

        <Disclaimer />
      </section>
    </div>
  );
}

export default MainPage;
