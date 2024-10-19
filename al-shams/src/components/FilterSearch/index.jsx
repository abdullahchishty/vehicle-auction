import React, { useState, useEffect, useRef } from "react";
import "./filterSearch.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/images/search-icon.svg";

const years = ["Any Models"];
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 1940; year--)
  years.push(year.toString());
const prices = ["All Prices"];
for (let price = 10000; price <= 10000000; price+=30000)
  prices.push(price.toString());

const FilterSearch = ({ isLoading }) => {

  const [selectedPrice, setSelectedPrice] = useState(prices[0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const yearDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);

  const toggleDropdown = (setter) => {
    setter((prevState) => !prevState);
  };

  const handleSelect = (value, setter, toggleSetter) => {
    setter(value);
    toggleSetter(false);
  };

  const handleSubmit = () => {
    if (isLoading)
      return
    const searchParams = new URLSearchParams(location.search);
    (search || search === "") && searchParams.set("search", search);
    Number(selectedPrice) ? searchParams.set("priceRange_to", selectedPrice) : searchParams.set("priceRangeTo", "");
    Number(selectedYear) ? searchParams.set("year", selectedYear) : searchParams.set("year", "");
    searchParams.set("page", 1);
    if (/\/listings\/.+/.test(location.pathname))
    navigate({ pathname: location.pathname, search: searchParams.toString() });
    else 
    navigate({ pathname: "/listings/inventory", search: searchParams.toString() });
  }

  useEffect(() => {
    const onMouseDown = (event) => {
      if (!(yearDropdownRef.current.contains(event.target))) {
        setYearDropdownOpen(false);
      }
    }
    if (yearDropdownOpen) {
      document.addEventListener("mousedown", onMouseDown);
    }
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    }
  }, [yearDropdownOpen]);

  useEffect(() => {
    const onMouseDown = (event) => {
      if (!(priceDropdownRef.current.contains(event.target))) {
        setPriceDropdownOpen(false);
      }
    }
    if (priceDropdownOpen) {
      document.addEventListener("mousedown", onMouseDown);
    }
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    }
  }, [priceDropdownOpen]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.get("search") && setSearch(params.get("search"))
    params.get("priceRange_to") && setSelectedPrice(params.get("priceRange_to"))
    params.get("year") && setSelectedYear(params.get("year"))
  }, [location.search]);

  return (
    <section className="filter-search">
      <div className="filter-search__container">
        <div className="filter-search__container__select">
          {/* Search Field */}
          <input
            type="text"
            className="filter-search__container__select__search-field"
            placeholder="Search..."
            value={search}
            onChange={(E) => setSearch(E.target.value)}
            onKeyDown={(E) => {(E.key === "Enter") && handleSubmit()}}
          />
          <div className="filter-search__container__select__vertical-divider"></div>
          {/* Year Dropdown */}
          <div className="custom-dropdown">
            <div
              className="filter-search__container__select__field"
              onClick={() => toggleDropdown(setYearDropdownOpen)}
            >
              {selectedYear}
            </div>
            {yearDropdownOpen && (
              <div className="custom-options" ref={yearDropdownRef}>
                {years.map((year, index) => (
                  <div
                    key={index}
                    className="custom-option"
                    onClick={() =>
                      handleSelect(year, setSelectedYear, setYearDropdownOpen)
                    }
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="filter-search__container__select__vertical-divider"></div>

          {/* Price Dropdown */}
          <div className="custom-dropdown" ref={priceDropdownRef}>
            <div
              className="filter-search__container__select__field"
              onClick={() => toggleDropdown(setPriceDropdownOpen)}
            > {Number(selectedPrice) ? "¥ " : undefined}
              {selectedPrice}
            </div>
            {priceDropdownOpen && (
              <div className="custom-options">
                {prices.map((price, index) => (
                  <div
                    key={index}
                    className="custom-option"
                    onClick={() =>
                      handleSelect(
                        price,
                        setSelectedPrice,
                        setPriceDropdownOpen
                      )
                    }
                  > {index !==0 && "¥ "}
                    {price}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="filter-search__container__select__icon" onClick={handleSubmit}>
            <Link className="search-icon">
              <img src={SearchIcon} alt="Search" />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterSearch;
