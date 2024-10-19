import React from "react";
import "./auctionSheetVerificationSteps.scss"
import car from "../../assets/images/car123.png"

const AuctionSheetVerificationSteps = () => {
  return (
    <div>
        <div className="auction-sheet-ver-steps">
          <div className="auction-sheet-ver-steps__text-container">
            <h1  className="auction-sheet-ver-steps__text-container__heading">Auction Sheet Verification Steps</h1>
            <ul className="auction-sheet-ver-steps__text-container__list">
              <li className="auction-sheet-ver-steps__text-container__list__list-item">
                <span className="auction-sheet-ver-steps__text-container__list__list-item__span">1</span> 
                Enter the car's chassis number
              </li>
              <li className="auction-sheet-ver-steps__text-container__list__list-item">
                <span className="auction-sheet-ver-steps__text-container__list__list-item__span">2</span> 
                Provide the required information
              </li>
              <li className="auction-sheet-ver-steps__text-container__list__list-item">
                <span className="auction-sheet-ver-steps__text-container__list__list-item__span">3</span> 
                Pay a one-time fee
              </li>
              <li className="auction-sheet-ver-steps__text-container__list__list-item">
                <span className="auction-sheet-ver-steps__text-container__list__list-item__span">4</span> 
                Receive your verified Japanese car auction sheet
                via Email or Whatsapp
              </li>
            </ul>
          </div>
          <img src={car}></img>
        </div>
    </div>
  )
};

export default AuctionSheetVerificationSteps;
