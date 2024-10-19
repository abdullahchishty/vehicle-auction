import React, { useEffect, useState } from "react";

const RangeFilter = ({
  title,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (fromValue || toValue)
      setIsOpen(true);
  }, [fromValue, toValue]);

  return (
    <div className="filter-group__section">
      <h3
        onClick={toggleDropdown}
        className="filter-group__section__title filter-group__section__heading"
      >
        {title} <span>{isOpen ? "-" : "+"}</span>
      </h3>
      {isOpen && (
        <div className="filter-group__section__input">
          <input
            type="number"
            className="filter-group__section__input__field"
            placeholder="From"
            value={fromValue}
            onChange={onFromChange}
          />
          <input
            type="number"
            className="filter-group__section__input__field"
            placeholder="To"
            value={toValue}
            onChange={onToChange}
          />
          <button className="filter-group__button" type="submit">
            Go
          </button>
        </div>
      )}
    </div>
  );
};

export default RangeFilter;
