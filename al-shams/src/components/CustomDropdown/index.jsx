import React, { useState, useEffect } from "react";
import "./customDropdown.scss";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className="custom-dropdown__header" onClick={handleToggle}>
        {selectedValue}
      </div>
      {isOpen && (
        <div className="custom-dropdown__options">
          {options.map((option) => (
            <div
              key={option}
              className="custom-dropdown__option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
