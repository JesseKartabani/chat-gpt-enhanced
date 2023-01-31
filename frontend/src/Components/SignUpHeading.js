import { CircularProgress } from "@mui/material";
import React from "react";
import "./SignUpHeading.css";

function SignUpHeading({ handleLogin, isLoggingIn }) {
  return (
    // Only visible when user isn't logged in
    <div className="sign-up-heading-container">
      {/* Logs user in with google */}
      <h4 onClick={handleLogin} className="sign-up-heading">
        Login
      </h4>

      {/* Loading spinner while user is being redirected to google login */}
      {isLoggingIn && <CircularProgress style={{ color: "#b3befe" }} />}
    </div>
  );
}

export default SignUpHeading;
