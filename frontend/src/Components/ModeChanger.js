import React from "react";
import "./ModeChanger.css";

// Displays a button that allows the user to change selected ai model
function ModeChanger({
  user,
  setSelectedModel,
  selectedModel,
  clearChat,
  clearInput,
  isLoading,
  setResponseFailed,
  setIsRateLimited,
}) {
  function handleClick() {
    if (selectedModel === "code-davinci-002") {
      setSelectedModel("text-davinci-003");
    }

    if (selectedModel === "text-davinci-003") {
      setSelectedModel("code-davinci-002");
    }

    clearChat();
    clearInput();
    setIsRateLimited(false);
    setResponseFailed(false);
  }

  return (
    <div className="mode-changer-container">
      {user && (
        <>
          {/* If the selected model is "code-davinci-002",
          show the button to switch to text mode */}

          {selectedModel === "code-davinci-002" ? (
            <>
              <div className="alpha-warning">Warning early alpha!</div>
              <button
                className="text-mode-button"
                onClick={handleClick}
                disabled={isLoading}
              >
                <svg
                  className="code-mode-svg"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-9.45 -9.45 113.4 113.4"
                  xmlSpace="preserve"
                >
                  <path d="M93.918 45.833 69.799 21.714c-.75-.75-2.077-.75-2.827 0l-5.229 5.229a2 2 0 0 0 0 2.828L79.22 47.246 61.744 64.724a2 2 0 0 0 0 2.828l5.229 5.229c.375.375.884.587 1.414.587.529 0 1.039-.212 1.414-.587l24.117-24.118a2.002 2.002 0 0 0 0-2.83zM32.759 64.724 15.285 47.248l17.477-17.475a1.999 1.999 0 0 0 0-2.828l-5.229-5.229a2 2 0 0 0-2.828 0L.585 45.833a2 2 0 0 0 0 2.829L24.704 72.78c.375.375.884.587 1.414.587.53 0 1.039-.212 1.414-.587l5.229-5.229a1.997 1.997 0 0 0-.002-2.827zM60.967 13.6a2.001 2.001 0 0 0-1.19-.962l-4.239-1.251a2 2 0 0 0-2.484 1.352L33.375 79.382a2 2 0 0 0 1.351 2.484l4.239 1.251a1.996 1.996 0 0 0 2.484-1.352l19.679-66.644a1.995 1.995 0 0 0-.161-1.521z" />
                </svg>
                Coding Mode
              </button>
            </>
          ) : (
            // Else show the button to switch to coding mode
            <button
              className="text-mode-button"
              onClick={handleClick}
              disabled={isLoading}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000"
                className="text-mode-svg"
              >
                <g
                  stroke="#fff"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.74V4.67c0-1.2-.98-2.09-2.17-1.99h-.06c-2.1.18-5.29 1.25-7.07 2.37l-.17.11c-.29.18-.77.18-1.06 0l-.25-.15C9.44 3.9 6.26 2.84 4.16 2.67 2.97 2.57 2 3.47 2 4.66v12.08c0 .96.78 1.86 1.74 1.98l.29.04c2.17.29 5.52 1.39 7.44 2.44l.04.02c.27.15.7.15.96 0 1.92-1.06 5.28-2.17 7.46-2.46l.33-.04c.96-.12 1.74-1.02 1.74-1.98ZM12 5.49v15M7.75 8.49H5.5M8.5 11.49h-3" />
                </g>
              </svg>
              Text Mode
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ModeChanger;
