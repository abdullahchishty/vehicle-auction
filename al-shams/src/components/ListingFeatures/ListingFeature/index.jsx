import React from "react";
import "./listingFeature.scss";

const ListingFeature = (props) => {
  return (
    <div className="listing-feature">
      {props.features.map((feature, index) => (
        <div key={index} className="listing-feature__feature">
          {feature}
        </div>
      ))}
    </div>
  );
};

export default ListingFeature;
