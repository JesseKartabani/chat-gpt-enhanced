import "./NewChatButton.css";
import React from "react";

const NewChatButton = ({
  clearChat,
  clearInput,
  handleNewChat,
  isLoading,
  setIsRateLimited,
  setResponseFailed,
}) => {
  function handleClick() {
    // Clear old messages
    clearChat();
    // Clear users input
    clearInput();
    // Sets a new conversation id
    handleNewChat();
    // Remove rate limit error message
    setIsRateLimited(false);
    // Remove response failed error message
    setResponseFailed(false);
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
