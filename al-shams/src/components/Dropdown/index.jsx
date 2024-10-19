import React, { useEffect, useRef } from "react";
import "./dropdown.scss";

const Dropdown = ({ isOpen, toggleDropdown, children }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {isOpen && <div className="dropdown-container__menu">{children}</div>}
    </div>
  );
};

export default Dropdown;
