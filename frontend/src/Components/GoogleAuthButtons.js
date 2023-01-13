import React from "react";
import "./GoogleAuthButtons.css";
import GoogleSvg from "./GoogleSvg";

function GoogleAuthButtons({ user, handleLogin, handleLogout }) {
  return (
    <div className="google-button-container">
      {user ? (
        <button className="google-button" onClick={handleLogout}>
          <GoogleSvg />
          Logout
        </button>
      ) : (
        <button className="google-button" onClick={handleLogin}>
          <GoogleSvg />
          Login with Google
        </button>
      )}
    </div>
  );
}

export default GoogleAuthButtons;
