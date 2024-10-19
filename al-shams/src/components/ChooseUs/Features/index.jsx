import React from "react";
import "./chooseUsFeatures.scss";

const ChooseUsFeatures = (props) => {
  return (
    <div className="choose-us-feature">
      <div className="choose-us-feature__container">
        <img
          src={props.image}
          alt={props.alt}
          className="choose-us-feature__container__image"
        />
        <h3 className="choose-us-feature__container__heading">
          {props.heading}
        </h3>
        <p className="choose-us-feature__container__text">{props.text}</p>
      </div>
    </div>
  );
};

export default ChooseUsFeatures;
