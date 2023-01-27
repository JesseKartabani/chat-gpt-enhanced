import "./NewChatButton.css";
import React from "react";

const NewChatButton = ({ clearChat, clearInput, handleNewChat, isLoading }) => {
  function handleClick() {
    clearChat();
    clearInput();
    handleNewChat();
  }

  return (
    <button
      className="new-chat-button"
      onClick={handleClick}
      disabled={isLoading}
    >
      <span>+</span>New Chat
    </button>
  );
};

export default NewChatButton;
