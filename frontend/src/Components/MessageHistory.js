import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import "./MessageHistory.css";

// TODO: Allow user to view full conversation when they click a message in history

// MessageHistory component to display first message of each conversation
function MessageHistory({ userId, db }) {
  const [messageHistory, setMessageHistory] = useState([]);

  // Fetch first message of each conversation
  useEffect(() => {
    // only run if user is logged in
    if (userId) {
      // Get the reference to the database
      get(ref(db, `messages/${userId}/`)).then((snapshot) => {
        // Check if data exists for the user
        if (snapshot.exists()) {
          // Get the conversation ids
          const conversationIds = Object.keys(snapshot.val());
          // Create an array to hold the first message of each conversation
          const firstMessages = [];
          // Loop through each conversation
          conversationIds.forEach((conversationId) => {
            // Get the database reference for each conversation
            get(ref(db, `messages/${userId}/${conversationId}`)).then(
              (snapshot) => {
                // Check if data exists for the conversation
                if (snapshot.exists()) {
                  // Get the first message of the conversation
                  const firstMessage = Object.values(snapshot.val())[0];
                  // Add the first message to the list
                  firstMessages.push(firstMessage);
                  // Check if all conversations have been processed
                  if (firstMessages.length === conversationIds.length) {
                    // Reverse the order of the messages
                    const reversedMessages = firstMessages.reverse();
                    // Update the state with the message history
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
      {/*Loop through the message history */}
      {messageHistory.map((message, index) => (
        // Display the first message for each conversation
        <button className="message-button" key={index}>
          <div className="message-container">
            {/* Chat bubble svg */}
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

            {/* Truncated message */}
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
