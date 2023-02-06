import React from "react";
import "./ResponseFailedError.css";

function ResponseFailedError() {
  return (
    <div className="response-failed-error-container">
      <div className="response-failed-error">
        There was an error generating your response. Try refreshing.
      </div>
    </div>
  );
}

export default ResponseFailedError;
