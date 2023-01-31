import React from "react";
import "./GoogleAuthButtons.css";
import GoogleSvg from "./GoogleSvg";

function GoogleAuthButtons({ user, handleLogin, handleLogout }) {
  return (
    <div className="google-button-container">
      {/* If the user is logged in, return a logout button */}
      {user ? (
        <button className="google-button" onClick={handleLogout}>
          <GoogleSvg />
          Logout
        </button>
      ) : (
        // Else user is logged out, return a login button
        <button className="google-button" onClick={handleLogin}>
          <GoogleSvg />
          Login
        </button>
      )}
    </div>
  );
}

export default GoogleAuthButtons;
