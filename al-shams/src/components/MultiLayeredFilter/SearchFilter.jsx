import React, { useEffect, useState } from "react";

const SearchFilter = ({ filters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-group__section">
      <h3
        onClick={toggleDropdown}
        className="filter-group__section__title filter-group__section__heading"
      >
        SEARCH FILTERS <span>{isOpen ? "-" : "+"}</span>
      </h3>
    </div>
  );
};

export default SearchFilter;
