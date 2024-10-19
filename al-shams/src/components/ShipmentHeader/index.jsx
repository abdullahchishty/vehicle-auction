import React from "react";

function ShipmentHeader({ id, status }) {
  return (
    <div className="shipment-details-container__header">
      <h1 className="shipment-details-container__header__heading">{`Shipment#${id}`}</h1>
      <div>
        <span className="shipment-details-container__header__current-status">Current Status</span>
        <span className={`shipment-details-container__header__current-status__${status}`}>{status}</span>
      </div>
    </div>
  );
}

export default ShipmentHeader;
