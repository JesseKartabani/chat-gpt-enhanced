import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";

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
                    setMessageHistory(firstMessages);
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
    <div>
      {messageHistory.map((message, index) => (
        <div key={index}>
          <p>{message.user === "me" && message.message}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageHistory;
