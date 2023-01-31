import "./NewChatButton.css";
import React from "react";

const NewChatButton = ({ clearChat, clearInput, handleNewChat, isLoading }) => {
  function handleClick() {
    // Clear old messages
    clearChat();
    // Clear users input
    clearInput();
    // Sets a new conversation id
    handleNewChat();
  }

  return (
    <button
      className="new-chat-button"
      onClick={handleClick}
      // Disabled while a message is loading
      disabled={isLoading}
    >
      <span>+</span>New Chat
    </button>
  );
};

export default NewChatButton;
