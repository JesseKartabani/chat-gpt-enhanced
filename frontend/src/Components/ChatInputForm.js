import "./ChatInputForm.css";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ChatInputForm = ({ input, setInput, handleSubmit, isLoading }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState(transcript);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    console.log("listening");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      //Clean up the transcript
      const cleanedTranscript = transcript.trim().replace(/\s+/g, " ");
      if (cleanedTranscript !== lastTranscript) {
        setInput(input + cleanedTranscript.slice(lastTranscript.length));
        setLastTranscript(cleanedTranscript);
      }
    }, 800);
  }, [transcript]);

  return (
    <div className="chat-input-box">
      <form data-testid="chat-input-form" onSubmit={handleSubmit}>
        <textarea
          data-testid="chat-input-textarea"
          className="chat-input-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Prompt"
          required={true}
        ></textarea>
        <button
          data-testid="submit-button"
          className="submit-button"
          disabled={isLoading}
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
    </div>
  );
};

export default ChatInputForm;
