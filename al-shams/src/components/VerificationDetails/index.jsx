import React from "react";
import "./verificationDetails.scss"
const VerificationDetails = ( {image, sheetNo, carName} ) => {
  return (
    <div className="details-container">
      <img className="details-container__image" src={image} />
      <div className="details-container__text-container">
        <h3 className="details-container__text-container__sheetNo">{`Auction Sheet # ${sheetNo}`}</h3>
        <p className="details-container__text-container__carName">{carName}</p>
      </div>
    </div>
  );
};

export default VerificationDetails;