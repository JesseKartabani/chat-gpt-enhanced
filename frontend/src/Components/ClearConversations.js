import { ref, remove } from "firebase/database";
import React, { useState } from "react";
import "./ClearConversations.css";

function ClearConversations({ user, db }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearConversation = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);

    // Remove user's message history
    remove(ref(db, `messages/${user.uid}`))
      .then(() => {})
      .catch((error) => {
        alert("There was an error:" + error);
      });
  };

  return (
    <>
      {user && (
        <div className="clear-conversation-container">
          {showConfirm ? (
            <button
              className="clear-conversation-button"
              onClick={handleConfirm}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="trash-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Confirm clear conversations
            </button>
          ) : (
            <button
              className="clear-conversation-button"
              onClick={handleClearConversation}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="trash-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
              </svg>
              Clear conversations
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default ClearConversations;
