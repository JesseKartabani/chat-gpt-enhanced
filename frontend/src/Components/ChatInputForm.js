import "./ChatInputForm.css";
import React from "react";

const ChatInputForm = ({ input, setInput, handleSubmit }) => {
  return (
    <div className="chat-input-box">
      <form onSubmit={handleSubmit}>
        <input
          className="chat-input-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default ChatInputForm;
