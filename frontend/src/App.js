import { useState } from "react";
import { CircularProgress } from "@mui/material";
import ChatInputForm from "./Components/ChatInputForm";
import ChatMessage from "./Components/ChatMessage";
import NewChatButton from "./Components/NewChatButton";
import Hero from "./Components/Hero";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Analytics
const firebaseConfig = {
  apiKey: "AIzaSyBGRLU71c5pzN5WNY5IZtjEuFIZsGdcEjY",
  authDomain: "chat-gpt-enhanced.firebaseapp.com",
  projectId: "chat-gpt-enhanced",
  storageBucket: "chat-gpt-enhanced.appspot.com",
  messagingSenderId: "869064780631",
  appId: "1:869064780631:web:81faca4dc336a34935ac12",
  measurementId: "G-7TSL92D0X3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  function clearChat() {
    setChatLog([]);
  }

  function clearInput() {
    setInput("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
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
        }),
      }
    );

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <aside className="side-menu">
        <NewChatButton clearChat={clearChat} clearInput={clearInput} />
      </aside>

      <section className="chat-box">
        <div className="mobile-new-chat-button">
          <NewChatButton clearChat={clearChat} clearInput={clearInput} />
        </div>
        {chatLog.length === 0 && <Hero />}

        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isLastMessage={index === chatLog.length - 1}
            />
          ))}
          {isLoading === true && (
            <CircularProgress className="circular-progress" />
          )}
        </div>

        <ChatInputForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}

export default App;
