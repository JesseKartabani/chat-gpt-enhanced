import "./NewChatButton.css";
import React from "react";

const NewChatButton = ({ handleNewChat, isLoading }) => {
  function handleClick() {
    // Sets a new conversation id, clears users input and messages,
    // also removes error messages
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
