import React from "react";
import "./exploreListings.scss";
import ProductCard from "../ProductCard";
import images from "../../assets/images";
import { Link } from "react-router-dom";

const ExploreLisitings = (props) => {
  return (
    <section className="explore-listings">
      <div className="explore-listings__container">
        <h2 className="explore-listings__container__heading">
          {props.title}
        </h2>
        <p className="explore-listings__container__tagline tagline">
          The journey from bidding to winning and finally driving the vehicle of
          your dreams, encapsulating the excitement of the auction process.
        </p>
        <div className="explore-listings__container__products">
          {props.ProductList.map((product, index) => (
            <ProductCard
              id={product._id}
              key={index}
              make={product.MARKA_NAME}
              model={product.MODEL_NAME}
              description={product.DESCRIPTION}
              location={product.LOCATION}
              milage={product.MILEAGE}
              fuel_type={product.FUEL_TYPE}
              transmission={product.TRANSMISSION}
              year={product.REGISTER_YEAR}
              starting={product.STARTING}
              price={product.PRICE}
              image={product.IMAGES?.[0]}
              alt={product.ALT}
              link={`/listings/inventory/${product._id}`}
            />
          ))}
        </div>
        {props.buttonLink && (
          <Link
            to={props.buttonLink}
            className="explore-listings__container__button dark-button"
          >
            {props.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default ExploreLisitings;
