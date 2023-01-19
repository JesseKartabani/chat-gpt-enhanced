import "./ChatInputForm.css";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SignUpHeading from "./SignUpHeading";

const ChatInputForm = ({ input, setInput, handleSubmit, isLoading, user }) => {
  const { transcript } = useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState(transcript);
  const [isListening, setIsListening] = useState(false);

  function handleToggleListening() {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      //Clean up the transcript and add it to input
      const cleanedTranscript = transcript.trim().replace(/\s+/g, " ");
      if (cleanedTranscript !== lastTranscript) {
        setInput(input + cleanedTranscript.slice(lastTranscript.length));
        setLastTranscript(cleanedTranscript);
      }
    }, 800);
  }, [transcript, input, setInput, lastTranscript]);

  return (
    <div className="chat-input-box">
      {!user && <SignUpHeading />}

      {/* Only show chat input if user is signed in */}
      {user && (
        <>
          <button
            className={`mic-button ${isListening && "listening"} ${
              isListening === false && "not-listening"
            }`}
            onClick={handleToggleListening}
            aria-label="toggle microphone"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              width={24}
              height={24}
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="mic-svg"
            >
              <path
                stroke="none"
                d="M16 24H8v-1h3.5v-3.018A7.004 7.004 0 0 1 5 13v-2h1v2.01A6.003 6.003 0 0 0 12 19c3.311 0 6-2.689 6-6v-2h1v2a7.004 7.004 0 0 1-6.5 6.982V23H16v1zM7 5c0-2.76 2.24-5 5-5s5 2.24 5 5v8c0 2.76-2.24 5-5 5s-5-2.24-5-5V5zm9 0c0-2.208-1.792-4-4-4S8 2.792 8 5v8c0 2.208 1.792 4 4 4s4-1.792 4-4V5z"
              />
            </svg>
          </button>

          <form data-testid="chat-input-form" onSubmit={handleSubmit}>
            <textarea
              maxLength="500" // Adjust this as needed
              required={true}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  if (e.target.value.trim() === "") return;
                  if (isLoading) return;
                  handleSubmit(e);
                }
              }}
              data-testid="chat-input-textarea"
              className="chat-input-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Prompt"
            ></textarea>
            <button
              data-testid="submit-button"
              className="submit-button"
              disabled={isLoading}
              aria-label="submit"
            >
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
        </>
      )}
    </div>
  );
};

export default ChatInputForm;
