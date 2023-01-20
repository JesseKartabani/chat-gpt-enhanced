import React from "react";
import "./SignUpHeading.css";

function SignUpHeading({ handleLogin }) {
  return (
    <div className="sign-up-heading-container" onClick={handleLogin}>
      <h4 className="sign-up-heading">Login to start using</h4>
    </div>
  );
}

export default SignUpHeading;
