import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sortComponent.scss";
import CustomDropdown from "../CustomDropdown";

const SortComponent = () => {
  const options = [
    "Price: Low to High",
    "Price: High to Low",
    "Year: Low to High",
    "Year: High to Low",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [activeFilter, setActiveFilter] = useState("Price: Low to High");

  // Set active filter based on URL parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortParam = params.get("sort");
    if (sortParam && options.includes(sortParam)) {
      setActiveFilter(sortParam);
    }
  }, [location.search, options]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    // Update URL parameters
    const params = new URLSearchParams(location.search);
    params.set("sort", filter);
    navigate({ search: params.toString() });
  };

  return (
    <div className="sort-component">
      <div className="sort-component__container">
        <div className="sort-component__container__select">
          <div className="sort-component__container__select__label">
            Sort by:
          </div>
          <CustomDropdown
            options={options}
            value={activeFilter}
            onChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SortComponent;
