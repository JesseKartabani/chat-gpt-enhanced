import React from "react";
import "./HeroInfo.css";

const HeroInfo = ({ info }) => {
  return (
    <div className="hero-info-container">
      <p className="hero-info-text">{info}</p>
    </div>
  );
};

export default HeroInfo;
