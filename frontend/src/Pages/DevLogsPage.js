import React from "react";
import "./DevLogsPage.css";
import { Link } from "react-router-dom";
import BugReportModal from "../Components/BugReportModal";
import FeatureRequestModal from "../Components/FeatureRequestModal";

function DevLogsPage({ db }) {
  return (
    <div className="dev-log-container">
      <h1>Developer Logs</h1>

      <Link className="return-link" to={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          style={{ marginRight: 10 }}
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
        <b>Return to Home</b>
      </Link>

      <div className="modals">
        <BugReportModal db={db} />
        <FeatureRequestModal db={db} />
      </div>

      <div className="recent-updates-container">
        <h2>Upcoming Updates</h2>
        <p>
          <b>
            Note: I am developing this project solo, however, I will make every
            effort to implement new features in a timely manner
          </b>
        </p>
        <ul className="list">
          <li>
            Finishing the message history so you can load your old messages
          </li>
          <br />
          <li>Syntax highlighting for code</li>
        </ul>
      </div>

      <div className="recent-updates-container">
        <h2>Recent Updates </h2>
        <ul className="list">
          <h3>(Jan 18/19)</h3>
          <li>
            Adjust the balance of logical and creative thinking for the AI to
            best suit your needs with the new slider above your prompt
          </li>
          <br />
          <li>
            Reporting bugs & requesting new features is now available (check the
            top of this page)
          </li>
          <br />
          <li>
            AI responses have been enhanced with proper formatting, including
            new line breaks and appropriate spacing
          </li>
        </ul>
      </div>

      <div className="other-projects-container">
        <h2>Other AI Projects By Me</h2>
        <a
          href="https://ai-image-generator-f4c78.web.app/"
          className="project-link"
        >
          <h3 className="text-center">Image Generator</h3>
          <img
            className="project-image"
            src={require("../assets/imageGenProject.png")}
            alt="AI Image generator project"
          ></img>
        </a>
      </div>
    </div>
  );
}

export default DevLogsPage;
