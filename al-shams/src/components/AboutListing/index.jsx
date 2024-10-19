import React from "react";
import "./aboutListing.scss";

const AboutListing = ({ description = ""}) => {
  return (
    <div className="about-listing">
      <h2 className="about-listing__heading">About the Vehicle</h2>
      <p className="about-listing__detail">{description}</p>
    </div>
  );
};

export default AboutListing;
