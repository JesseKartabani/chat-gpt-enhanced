import "./NewChatButton.css";
import React from "react";

const NewChatButton = ({ clearChat, clearInput }) => {
  function handleClick() {
    clearChat();
    clearInput();
  }

  return (
    <div className="new-chat-button" onClick={handleClick}>
      <span>+</span>New Chat
    </div>
  );
};

export default NewChatButton;
