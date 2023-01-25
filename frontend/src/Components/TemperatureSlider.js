import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import "./TemperatureSlider.css";

function TemperatureSlider({ setTemperature, user }) {
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTemperature(value / 100);
  };
  return (
    <div className="temperature-container">
      {user && (
        <>
          <Slider
            aria-label="Creativity"
            value={value}
            onChange={handleChange}
            sx={{
              color: "#b3befe",
            }}
          />
          <div className="temperature-headings">
            <p className="temperature-description">Logical</p>
            <p className="temperature-description">Balanced</p>
            <p className="temperature-description">Creative</p>
          </div>
        </>
      )}
    </div>
  );
}

export default TemperatureSlider;
