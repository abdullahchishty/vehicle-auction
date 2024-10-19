import React, { useState, useEffect, useRef } from 'react';
import './customSelect.scss';

const CustomSelect = ({
  options,
  selectedOption,
  onSelect,
  placeholder = 'Select an option',
  disabled = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  const handleSelect = (option) => {
    onSelect(option,option.value);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  const selectedOptionObject = options.find(opt => opt.value === selectedOption);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div
        className={`custom-select__selected ${dropdownOpen ? 'custom-select__selected--active' : ''}`}
        onClick={toggleDropdown}
      >
        {selectedOptionObject ? selectedOptionObject.label : placeholder}
      </div>
      {dropdownOpen && (
        <div className="custom-select__options">
          {options.map((option, index) => (
            <div
              key={index}
              className="custom-select__option"
              onClick={() => handleSelect(option)}
            >
              {option.label || option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
