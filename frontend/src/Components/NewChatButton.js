import "./NewChatButton.css";
import React from "react";

const NewChatButton = ({ clearChat, clearInput, handleNewChat }) => {
  function handleClick() {
    clearChat();
    clearInput();
    handleNewChat();
  }

  return (
    <div className="new-chat-button" onClick={handleClick}>
      <span>+</span>New Chat
    </div>
  );
};

export default NewChatButton;
