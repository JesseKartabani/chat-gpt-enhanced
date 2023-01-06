import "./NewChatButton.css";
import React from "react";

const NewChatButton = ({ clearChat }) => {
  return (
    <div className="new-chat-button" onClick={clearChat}>
      <span>+</span>New Chat
    </div>
  );
};

export default NewChatButton;
