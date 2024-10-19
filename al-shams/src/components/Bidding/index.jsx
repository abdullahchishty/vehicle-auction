import React from "react";
import { Link } from "react-router-dom";
import "./bidding.scss";

const Bidding = ({ 
  vehicleName = "a car", 
  price, 
  currency = "¥", 
  discount = { isDiscount: false, originalPrice: 0 },
  description = "Bidding starting from",
  btnText = "Bid Via Whatsapp"
  }) => {
  return (
    <div className="bidding">
      <div className="bidding__container">
        <p className="bidding__container__heading">{description}</p>
        <div className="bidding__container__pricing">
          <p className="bidding__container__pricing__main_price">{currency} {(!price && price!==0) ? "_" : price}</p>
          {discount.isDiscount && <p className="bidding__container__pricing__discount">{currency}{discount.originalPrice}</p>}
        </div>
        {discount.isDiscount && <p className="bidding__container__saving">Instant Saving: {currency}{discount.originalPrice-price}</p>}
        <div className="bidding__container__button">
          <Link
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            to={`https://wa.me/+818020554445/?text=I'm%20interested%20in%20buying%20${vehicleName}%20for%20sale%20on%20Alshams%20website%20${window.location.href}`}
            className="bidding__container__button__bid"
          >
            {btnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bidding;
