import React from "react";
import "./whyChooseFeature.scss";

const WhyChooseFeatures = (props) => {
  return (
    <div className="why-choose-feature">
      <div
        className={`why-choose-feature__image__container why-choose-feature__image__${props.image}`}
      ></div>
      <div className="why-choose-feature__container">
        <h3 className="why-choose__container__heading">{props.heading}</h3>
        <p className="why-choose-feature__container__description">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default WhyChooseFeatures;
