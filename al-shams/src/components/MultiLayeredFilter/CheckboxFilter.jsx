import React, { useEffect, useState } from "react";

const CheckboxFilter = ({ title, options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (selectedOptions.length)
      setIsOpen(true)
  }, [selectedOptions]);

  return (
    <div className="filter-group__section">
      <h3
        onClick={toggleDropdown}
        className="filter-group__section__title filter-group__section__heading"
      >
        {title} <span>{isOpen ? "-" : "+"}</span>
      </h3>
      {(isOpen && options && Array.isArray(options) && options.length!=0) && (
        <div className="filter-group__section__options">
          {options?.map((option) => (
            <div className="filter-group__section__options__option">
              <label
                className="filter-group__section__options__option__label"
                key={option.value}
              >
                <input
                  className="filter-group__section__options__option__label__checkbox"
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={onChange}
                />
                {option.label}
              </label>

              <p className="filter-group__section__options__option__count">
                {" "}
                {option.count}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
