import React from "react";
import auctionSheetBanner from "../../assets/images/auction-sheet-banner.png";
import "./auctionSheetBanner.scss"

const AuctionSheetVerification = () => {
  return (
    <div className="auction-sheet-verification-banner__container">
        <div className="auction-sheet-verification-banner">
        <div className="auction-sheet-verification-banner__text">
          <h1 className="auction-sheet-verification-banner__text__heading"> Al Shams Auction</h1>
          <h1 className="auction-sheet-verification-banner__text__heading">Sheet Verification</h1>
        </div>
        <img className="auction-sheet-verification-banner__image" src={auctionSheetBanner}></img>
      </div>
    </div>
  );
};

export default AuctionSheetVerification;