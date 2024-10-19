import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeywordFilter from "./KeywordFilter";
import CheckboxFilter from "./CheckboxFilter.jsx";
import RangeFilter from "./RangeFilter";
import "./multiLayeredFilter.scss";

const MultiLayeredFilterComponent = ({ filtersCount, isLoading }) => {
  const [filters, setFilters] = useState({
    search: "",
    brand: [],
    auctionSheet: [],
    transmission: [],
    condition: [],
    priceRange: { from: "", to: "" },
  });

  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams();

  const updateURLParams = (newFilters) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.forEach((_, key) => {
      if (key !== 'sort' && key !== 'category') {
        searchParams.delete(key);
      }
    });
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        searchParams.set(key, newFilters[key].join(","));
      } else if (typeof newFilters[key] === "object") {
        if (newFilters[key].from)
          searchParams.set(`${key}_from`, newFilters[key].from);
        if (newFilters[key].to)
          searchParams.set(`${key}_to`, newFilters[key].to);
      } else if (newFilters[key]) {
        searchParams.set(key, newFilters[key]);
      }
    });
    searchParams.set("page", 1);
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = { ...filters };
    Object.keys(newFilters).forEach((key) => {
      if (params.has(key)) {
        if (Array.isArray(newFilters[key])) {
          newFilters[key] = params.get(key).split(",");
        } else if (typeof newFilters[key] === "object") {
          // newFilters[key].from = params.get(`${key}_from`) || "";
          // newFilters[key].to = params.get(`${key}_to`) || "";
        } else {
          newFilters[key] = params.get(key);
        }
      }
    });
    newFilters.priceRange.from = filtersCount?.PRICE?.minPrice || "";
    newFilters.priceRange.to = filtersCount?.PRICE?.maxPrice || "";

    setFilters(newFilters);
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    const newFilters = {
      ...filters,
      [category]: checked
        ? [...filters[category], value]
        : filters[category].filter((item) => item !== value),
    };
    setFilters(newFilters);
  };

  const handleRangeChange = (e, category, type) => {
    const { value } = e.target;
    const newFilters = {
      ...filters,
      [category]: {
        ...filters[category],
        [type]: value,
      },
    };
    setFilters(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateURLParams(filters);
  };

  return (
    <div className="filter-group">
      <div className="filter-group__heading">Show Results By:</div>
      <button
        type="button"
        className="filter-toggle-button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {!showFilters ? "Show Filters" : "Hide Filters"}
      </button>

      <form
        onSubmit={handleSubmit}
        className={`filters-form ${!showFilters ? "show" : ""}`}
      >
        {/* <SearchFilter filters={filters} /> */}
        <KeywordFilter keyword={filters.search} onChange={handleInputChange} />
        <CheckboxFilter
          title="BY BRAND"
          options={
            filtersCount?.["MARKA_NAME"] &&
            Object.keys(filtersCount["MARKA_NAME"]).map(brand => ({
              value: brand,
              label: brand,
              count: filtersCount["MARKA_NAME"][brand]
            })).filter(item => item.count)}
          selectedOptions={filters.brand}
          onChange={(e) => handleCheckboxChange(e, "brand")}
        />
        <CheckboxFilter
          title="TRANSMISSION"
          options={
            filtersCount?.["TRANSMISSION"] &&
            Object.keys(filtersCount["TRANSMISSION"]).map(transmission => ({
              value: transmission,
              label: transmission,
              count: filtersCount["TRANSMISSION"][transmission]
            })).filter(item => item.count)}
          selectedOptions={filters.transmission}
          onChange={(e) => handleCheckboxChange(e, "transmission")}
        />
        {type !== "auction" ? (<CheckboxFilter
          title="CONDITION"
          options={
            filtersCount?.["CONDITION"] &&
            Object.keys(filtersCount["CONDITION"]).map(condition => ({
              value: condition,
              label: condition,
              count: filtersCount["CONDITION"][condition]
            })).filter(item => item.count)}
          selectedOptions={filters.condition}
          onChange={(e) => handleCheckboxChange(e, "condition")}
        />) : null }        
        {type !== "auction" ? (<CheckboxFilter
          title="AUCTION SHEET"
          options={
            filtersCount?.["AUCTION_SHEET"] &&
            Object.keys(filtersCount["AUCTION_SHEET"]).map(auctionSheet => ({
              value: auctionSheet,
              label: auctionSheet === "true" ? "Verified" : "Not Verified",
              count: filtersCount["AUCTION_SHEET"][auctionSheet]
            })).filter(item => item.count)}
          selectedOptions={filters.auctionSheet}
          onChange={(e) => handleCheckboxChange(e, "auctionSheet")}
        />) : null}
        <RangeFilter
          title="PRICE RANGE"
          fromValue={filters.priceRange.from}
          toValue={filters.priceRange.to}
          onFromChange={(e) => handleRangeChange(e, "priceRange", "from")}
          onToChange={(e) => handleRangeChange(e, "priceRange", "to")}
        />
        <button className="apply-filters filter-group__button" type="submit">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default MultiLayeredFilterComponent;
