import React, { useState } from "react";
import "./inlineFilters.scss";
import { Link } from "react-router-dom";
import CustomDropdown from "../CustomDropdown";

const InlineFilters = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("recent");
  const options = ["recent", "featured", "popular"];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter); // Notify parent component of the filter change
  };

  return (
    <div className="inline-filters">
      <div className="inline-filters__container desktop-filters">
        <Link
          className={`inline-filters__container__filter ${
            activeFilter === "recent" ? "active" : ""
          }`}
          to="#"
          onClick={() => handleFilterChange("recent")}
        >
          Recent Cars
        </Link>
        <Link
          className={`inline-filters__container__filter ${
            activeFilter === "featured" ? "active" : ""
          }`}
          to="#"
          onClick={() => handleFilterChange("featured")}
        >
          Featured Cars
        </Link>
        <Link
          className={`inline-filters__container__filter ${
            activeFilter === "popular" ? "active" : ""
          }`}
          to="#"
          onClick={() => handleFilterChange("popular")}
        >
          Popular Cars
        </Link>
      </div>
      <div className="inline-filter__container mobile-filters">
        <CustomDropdown
          options={options}
          value={activeFilter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default InlineFilters;
