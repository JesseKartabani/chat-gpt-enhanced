import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import "./MessageHistory.css";

function MessageHistory({ userId, db }) {
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      get(ref(db, `messages/${userId}/`)).then((snapshot) => {
        if (snapshot.exists()) {
          const conversationIds = Object.keys(snapshot.val());
          // Create an array to hold the first message of each conversation
          const firstMessages = [];
          conversationIds.forEach((conversationId) => {
            get(ref(db, `messages/${userId}/${conversationId}`)).then(
              (snapshot) => {
                if (snapshot.exists()) {
                  // Get the first message of the conversation
                  const firstMessage = Object.values(snapshot.val())[0];
                  firstMessages.push(firstMessage);
                  // Check if all conversations have been processed
                  if (firstMessages.length === conversationIds.length) {
                    // Reverse the order of the messages
                    const reversedMessages = firstMessages.reverse();
                    setMessageHistory(reversedMessages);
                  }
                } else {
                  console.log("No data available");
                }
              }
            );
          });
        } else {
          console.log("No data available");
        }
      });
    }
  }, [userId, db]);

  return (
    <div className="message-history-container">
      {messageHistory.map((message, index) => (
        // First message user sent for each conversation
        <button className="message-button" key={index}>
          <div className="message-container">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="message-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="truncate-text">
              {message.user === "me" &&
                // Uppercase first character of message
                message.message.charAt(0).toUpperCase() +
                  message.message.slice(1)}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default MessageHistory;
