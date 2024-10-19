import React from "react";
import "./countCard.scss";

const CountCard = ({ heading, number, svgClass }) => {
  return (
    <div className="count-card-container">
      <div className="count-card-container__left-section">
        <div className="count-card-container__left-section__heading">
          {heading}
        </div>
        <div className="count-card-container__left-section__number">
          {number}
        </div>
      </div>
      <div className="count-card-container__right-container">
        <div
          className={`count-card-container__right-container__right-section ${svgClass}`}
        ></div>
      </div>
    </div>
  );
};

export default CountCard;
