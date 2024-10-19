import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./breadCrum.scss";

const BreadCrum = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index === items.length - 1 ? (
              <span className="breadcrumb-item-last-page">{item.text}</span>
            ) : item.text === "Listings" ? (
              <Link
                className="breadcrumb-item-link"
                onClick={() => navigate(-1)}
              >
                {item.text}
              </Link>
            ) : (
              <Link className="breadcrumb-item-link" to={item.href}>
                {item.text}
              </Link>
            )}
            {index < items.length - 1 && (
              <span className="breadcrumb-item-separator"> / </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrum;
