import React, { useState } from "react";
import "./auctionSheetVerification.scss"
import ModalDecider from "../ModalDecider";

const AuctionSheetVerification = () => {

  const [chassisNumber, setChassisNumber] = useState("");
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    type: "Enter Details"
  });

  function onChassisNumberInputChange(E) {
    setChassisNumber(E.target.value);
  }

  function onVerifyAuctionSheetBtn() {
    setModalDetails({...modalDetails, isOpen: true})
  }

  return (
    <>
      <div className="auction-sheet-form-main__container"> 
        <div className="auction-sheet-form-main">
          <h3 className="auction-sheet-form-main__heading">Auction Sheet Verification</h3>
          <p className="auction-sheet-form-main__paragraph">
            Get the original Auction Sheet Verified by Al Shams to buy the Japanese car with
            complete peace of mind!
          </p>
          <input value={chassisNumber} onChange={onChassisNumberInputChange} className="auction-sheet-form-main__input" type="text" placeholder="Enter Chassis Number (eg: ZZT240-316982)" />
          <button onClick={onVerifyAuctionSheetBtn} className="auction-sheet-form-main__button">Verify Auction Sheet</button>
        </div>
      </div>
      <ModalDecider chassisNum={chassisNumber} modalDetails={modalDetails} setModalDetails={setModalDetails} />
    </>
  );
};

export default AuctionSheetVerification;
