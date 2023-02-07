import React from "react";
import "./CodingModeGuide.css";

function CodingModeGuide({ selectedModel }) {
  return (
    <div>
      {/* If user is in code mode display link to guide */}
      {selectedModel === "code-davinci-002" && (
        <div className="code-mode-help">
          <a
            className="code-mode-help-link"
            href="https://platform.openai.com/docs/guides/code/best-practices"
            target="_blank"
          >
            Learn how to use coding mode
          </a>
        </div>
      )}
    </div>
  );
}

export default CodingModeGuide;
