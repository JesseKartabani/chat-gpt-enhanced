import React from "react";
import "./Disclaimer.css";
import { Link } from "react-router-dom";

function Disclaimer() {
  return (
    <div className="disclaimer-container">
      <p className="disclaimer-text">
        Disclaimer: Not affiliated with or endorsed by OpenAI
      </p>
      <Link className="dev-log-link" to={"/developer-logs"}>
        Upcoming Updates
      </Link>
    </div>
  );
}

export default Disclaimer;
