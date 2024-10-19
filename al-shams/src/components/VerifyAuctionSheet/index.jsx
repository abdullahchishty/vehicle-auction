import React from "react";
import images from "../../assets/images";
import "./verifyAuctionSheet.scss";
import { Link } from "react-router-dom";

const VerifyAuctionSheet = () => {
  return (
    <section className="verify-auction">
      <div className="verify-auction__container">
        <div className="verify-auction__container__images">
          <div className="verify-auction__container__images__left-images">
            <img className="image-one" src={images.auction1} alt="car1" />
            <img className="image-two" src={images.auction2} alt="car2" />
          </div>
          <div className="verify-auction__container__images__right-images">
            <img className="image-three" src={images.auction3} alt="car3" />
          </div>
        </div>
        <div className="verify-auction__container__content">
          <h2 className="verify-auction__container__content__heading">
            Ensure Confidence in Your Bids with Auction Sheet Verification
          </h2>
          <p className="verify-auction__container__content__text">
            Our Auction Sheet Verification service provides you with a detailed
            and transparent overview of each vehicle’s auction history, helping
            you make informed decisions with peace of mind.
          </p>
          <ul className="verify-auction__container__content__ul">
            <li className="verify-auction__container__content__ul__li">
              Access Comprehensive Vehicle Histories
            </li>
            <li className="verify-auction__container__content__ul__li">
              Verify Authenticity
            </li>
            <li className="verify-auction__container__content__ul__li">
              Make Informed Bids
            </li>
          </ul>
          {/* <Link className="verify-auction__container__content__verify-button dark-button">
            Verify my auction sheet
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default VerifyAuctionSheet;
