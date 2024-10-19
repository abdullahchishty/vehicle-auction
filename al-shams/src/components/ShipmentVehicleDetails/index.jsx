import React from "react";
import ImageGallery from "../ImageGallery";
import VehicleAdditionalProps from "../VehicleAdditionalProps";
import "./shipmentVehicleDetails.scss"

function ShipmentVehicleDetails({ vehicleDetails }) {
  return (
    <div>
      <h1 className="vehicle-details-heading">Vehice Details</h1>
      <div className="vehicle-details-container">
        <div className="vehicle-details-container__left-section">
          <h3>{vehicleDetails.name}</h3>
          <p className="vehicle-details-container__left-section__paragraph">{vehicleDetails.description}</p>
          <h2>{vehicleDetails.price}</h2>
          <VehicleAdditionalProps vehicleProps={vehicleDetails.additionalProps} />
        </div>
        <ImageGallery images={vehicleDetails.images}/>
      </div>
    </div>
  );
}

export default ShipmentVehicleDetails;
