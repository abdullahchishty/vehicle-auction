import React, { useEffect, useState } from "react";

const KeywordFilter = ({ keyword, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (keyword)
      setIsOpen(true);
  }, [keyword])
  return (
    <div className="filter-group__section">
      <h3
        onClick={toggleDropdown}
        className="filter-group__section__title filter-group__section__heading"
      >
        SEARCH BY KEYWORD <span>{isOpen ? "-" : "+"}</span>
      </h3>
      {isOpen && (
        <div className="filter-group__section__input">
          <input
            className="filter-group__section__input__field"
            type="text"
            name="search"
            placeholder="e.g. Honda"
            value={keyword}
            onChange={onChange}
          />
          <button className="filter-group__button" type="submit">
            Go
          </button>
        </div>
      )}
    </div>
  );
};

export default KeywordFilter;
