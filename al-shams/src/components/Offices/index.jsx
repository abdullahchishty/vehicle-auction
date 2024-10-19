import React from "react";
import "./offices.scss";
import OfficeLocation from "./OfficeLocation";

const Offices = () => {
  return (
    <div className="offices">
      <h2 className="offices__heading">Our Office</h2>
      <div className="offices__container">
        <OfficeLocation />
      </div>
    </div>
  );
};

export default Offices;
