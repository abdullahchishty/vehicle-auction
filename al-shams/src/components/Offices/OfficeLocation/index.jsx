import React from "react";
import "./officeLocation.scss";
import { Link } from "react-router-dom";

const OfficeLocation = () => {
  return (
    <div className="office-location">
      <h3 className="office-location__heading">Tokyo Japan</h3>
      <p className="office-location__address">
      5-26-12 Hillside Terrace U 103
      Nishi Gotanda Shinagawa-Ku Tokyo, Japan
      141-0031
      </p>
      {/* <Link className="office-location__map" to={"/"}>
        See on Map
      </Link> */}
      <Link className="office-location__contact email" to={"/"}>
        info@alshamscorporation.com
      </Link>
      <Link className="office-location__contact phone" to={"/"}>
        090-1575-0786
      </Link>
    </div>
  );
};

export default OfficeLocation;
