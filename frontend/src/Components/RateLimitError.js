import React, { useEffect } from "react";
import "./RateLimitError.css";

function RateLimitError({ clearChat, setIsLoading }) {
  useEffect(() => {
    clearChat();
    setIsLoading(false);
  }, []);

  return (
    <div className="rate-limit-error-container">
      <div className="rate-limit-error">
        Too many requests in 1 hour. Try again later.
      </div>
    </div>
  );
}

export default RateLimitError;
