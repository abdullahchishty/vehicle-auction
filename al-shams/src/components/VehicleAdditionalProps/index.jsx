import React from "react";

function VehicleAdditionalProps({ vehicleProps }) {
  return (
    <div className="vehicle-details-container__left-section__vehicle-props-container">
      <div className="vehicle-details-container__left-section__vehicle-props-container__key-container">
        {Object.keys(vehicleProps).map(key => (
          <div className="overview-detail__container my-overview-detail__container">
            <span className={`overview-detail__container__info-name detail-${vehicleProps[key]["img"]}`}>{key}</span>
          </div>
          ))}
      </div>
      <div className="vehicle-details-container__left-section__vehicle-props-container__value-container">
        {Object.values(vehicleProps).map(obj => (<span className="">{obj.value}</span>))}
      </div>
    </div>
  );
}

export default VehicleAdditionalProps;
