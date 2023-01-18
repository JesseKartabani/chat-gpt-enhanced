import React from "react";
import "./Error404Page.css";

function Error404Page() {
  return (
    <div className="flex-container">
      <div className="text-center">
        <h1 className="first-heading">
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="second-heading fadeIn">PAGE NOT FOUND</h3>
        <a href="https://chat-gpt-enhanced.web.app/">
          <button type="button" name="button" className="return-button">
            Return To Home
          </button>
        </a>
      </div>
    </div>
  );
}

export default Error404Page;
