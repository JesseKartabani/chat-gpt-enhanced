import "./ChatInputForm.css";
import React from "react";

const ChatInputForm = ({ input, setInput, handleSubmit }) => {
  return (
    <div className="chat-input-box">
      <form onSubmit={handleSubmit}>
        <textarea
          className="chat-input-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Prompt"
        ></textarea>
        <button className="submit-button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 20 20"
            className="submit-svg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.894 2.553a1 1 0 0 0-1.788 0l-7 14a1 1 0 0 0 1.169 1.409l5-1.429A1 1 0 0 0 9 15.571V11a1 1 0 1 1 2 0v4.571a1 1 0 0 0 .725.962l5 1.428a1 1 0 0 0 1.17-1.408l-7-14z"
              stroke="none"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInputForm;
