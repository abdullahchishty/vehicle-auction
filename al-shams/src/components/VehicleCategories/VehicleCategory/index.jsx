import React from "react";
import { Link } from "react-router-dom";
import "./vehicleCategory.scss";

const VehicleCategory = (props) => {
  return (
    <Link to={props.link} className="vehicle-category">
      <div className="vehicle-category__image">
        <img src={props.icon} alt={props.text}/>
      </div>
      <div className="vehicle-category__text">
        <p>{props.text}</p>
      </div>
    </Link>
  );
};

export default VehicleCategory;
