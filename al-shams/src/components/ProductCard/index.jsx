import React from "react";
import images from "../../assets/images";
import "./productCard.scss";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.setItem("fromPage", window.location.pathname);
  };
  return (
      <div className="product-card" onClick={E => E.ctrlKey ? window.open(props.link, "_blank") : navigate(props.link)}>
        <img
          src={props.listingsType !== "auction" ? `${import.meta.env.VITE_API_BASE_URL}/${props.image}` : props.image}
          height={props.image ? null : 180}
          className="product-card__container__image"
        ></img>
        <div className="product-card__actions">
          <p className="product-card__actions__offer">Great Price</p>
        </div>
        <span
          className="product-card__container"
        >
          {" "}
          <h3 className="product-card__container__heading">{(props.make ||' __ ')+' '+(props.model ||' __ ')}</h3>
          <p className="product-card__container__description">
            {props.description || '_'}
          </p>
          {/* <p className="product-card__container__location">{props.location || '_'}</p> */}
          <div className="product-card__container__details">
            <div className="product-card__container__details__content detail">
              <p className="product-card__container__details__content__milage detail">
                {props.milage || '_'} {props.milageUnit || "km"}
              </p>
              <p className="product-card__container__details__content__type detail">
                {props.fuel_type || 'NA'}
              </p>
            </div>
            <div className="product-card__container__details__content">
              <p className="product-card__container__details__content__transmission detail">
                {props.transmission || 'NA'}
              </p>
              <p className="product-card__container__details__content__model detail">
                {props.year || 'NA'}
              </p>
            </div>
          </div>
          <div className="product-card__container__bidding">
            <div className="product-card__container__bidding-wrapper">
              <p className="label">{props.starting || 'Starting from'}</p>
              <p className="price">{`${props.currency || "¥"} `+(props.price || '_')}</p>
            </div>
            <Link
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              to={`https://wa.me/+818020554445/?text=I'm%20interested%20in%20${(props.make ||' __ ')+' '+(props.model ||' __ ')}%20for%20sale%20on%20Alshams%20website%20${window.location.href}`}
              className="product-card__container__bidding__button"
            >
              Bid Now
            </Link>
          </div>
        </span>
      </div>
  );
};

export default ProductCard;