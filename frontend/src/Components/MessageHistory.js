import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";

function MessageHistory({ userId, db }) {
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    if (userId) {
      get(ref(db, `messages/${userId}/`)).then((snapshot) => {
        if (snapshot.exists()) {
          const conversationIds = Object.keys(snapshot.val());
          // Now you can use the conversationIds to get the messageHistory
          conversationIds.forEach((conversationId) => {
            get(ref(db, `messages/${userId}/${conversationId}`)).then(
              (snapshot) => {
                if (snapshot.exists()) {
                  setMessageHistory((prevMessages) => [
                    ...prevMessages,
                    ...Object.values(snapshot.val()),
                  ]);
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
