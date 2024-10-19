import React from "react";
import { useNavigate } from "react-router-dom";
import "./navigationButton.scss"

const NavigationButton = ({ url, heading, className,goBack }) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        if (goBack) {
            navigate(-1); 
      } else {
        navigate(url);
      }
  };

  return (
    <button className="navigation-button" onClick={handleNavigation}>
      <span className={`navigation-button__heading ${className}`}>{heading}</span>
    </button>
  );
};

export default NavigationButton;
