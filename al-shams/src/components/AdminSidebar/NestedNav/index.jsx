import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./nestedNav.scss";

const NestedNav = ({ title, options, onBack }) => {
  return (
    <div className="nested-nav">
      <Link className="nested-nav__back" to="/admin-a1b2c3/" onClick={onBack}>
        Back
      </Link>
      <h3 className="nested-nav__title">{title}</h3>
      <ul className="nested-nav__list">
        {options.map((option, index) => (
          <li key={index} className="nested-nav__list__item">
            <NavLink
              to={option.link}
              className={({ isActive }) =>
                `nested-nav__list__item__link ${isActive ? "active" : ""}`
              }
            >
              {option.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NestedNav;
