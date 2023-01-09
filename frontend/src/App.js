import { useState } from "react";
import { CircularProgress } from "@mui/material";
import ChatInputForm from "./Components/ChatInputForm";
import ChatMessage from "./Components/ChatMessage";
import NewChatButton from "./Components/NewChatButton";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  function clearChat() {
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    setIsLoading(true);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <aside className="side-menu">
        <NewChatButton clearChat={clearChat} />
      </aside>

      <section className="chat-box">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
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
