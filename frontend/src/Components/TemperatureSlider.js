import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import "./TemperatureSlider.css";

// Controls the temperature property in the backend
function TemperatureSlider({ setTemperature, user }) {
  // Starting point for slider (0-100)
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    // When slider is moved update the value the user sees
    setValue(newValue);
    // Set temperature by dividing our value by 100 because the temperature
    // prop is from 0-1 not 0-100 like our value for displaying the slider
    setTemperature(newValue / 100);
  };
  return (
    <div className="temperature-container">
      {/* Display if user is logged in */}
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
