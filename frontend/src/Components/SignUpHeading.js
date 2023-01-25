import { CircularProgress } from "@mui/material";
import React from "react";
import "./SignUpHeading.css";

function SignUpHeading({ handleLogin, isLoggingIn }) {
  return (
    <div className="sign-up-heading-container">
      <h4 onClick={handleLogin} className="sign-up-heading">
        Login
      </h4>
      {isLoggingIn && <CircularProgress />}
    </div>
  );
}

export default SignUpHeading;
