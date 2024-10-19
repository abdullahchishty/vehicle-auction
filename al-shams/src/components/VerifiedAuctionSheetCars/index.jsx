import React from "react";
import ProductCard from "../ProductCard";
import images from "../../assets/images";
import { Link } from "react-router-dom";
import "./verifiedAuctionSheetCars.scss"

const ProductList = [
  {
    title: "2019 Toyota Corolla",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Karachi, Pakistan",
    milage: "20,000 km",
    type: "Used",
    transmission: "Automatic",
    model: "2019",
    starting: "Starting bid",
    price: "$15,000",
    image: images.car1,
    alt: "product1",
    link: "/",
  },
  {
    title: "2019 Toyota Corolla",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Karachi, Pakistan",
    milage: "20,000 km",
    type: "Used",
    transmission: "Automatic",
    model: "2019",
    starting: "Starting bid",
    price: "$15,000",
    image: images.car2,
    alt: "product2",
    link: "/",
  },
  {
    title: "2019 Toyota Corolla",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Karachi, Pakistan",
    milage: "20,000 km",
    type: "Used",
    transmission: "Automatic",
    model: "2019",
    starting: "Starting bid",
    price: "$15,000",
    image: images.car3,
    alt: "product3",
    link: "/",
  },
  {
    title: "2019 Toyota Corolla",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Karachi, Pakistan",
    milage: "20,000 km",
    type: "Used",
    transmission: "Automatic",
    model: "2019",
    starting: "Starting bid",
    price: "$15,000",
    image: images.car1,
    alt: "product4",
    link: "/",
  },
];

const VerifiedAuctionSheetCars = () => {
  return (
    <section className="explore-listings explore-listings-1">
      <div className="explore-listings__container">
        <h2 className="explore-listings__container__heading"> 
        Verified Auction Sheet Cars
        </h2>
        <div className="explore-listings__container__products">
          {ProductList.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              location={product.location}
              milage={product.milage}
              fuel_type={product.FUEL_TYPE}
              type={product.type}
              transmission={product.transmission}
              model={product.model}
              starting={product.starting}
              price={product.price}
              image={product.image}
              alt={product.alt}
              link={product.link}
            />
          ))}
        </div>
        <Link
          to={"/"}
          className="explore-listings__container__button dark-button"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default VerifiedAuctionSheetCars;
