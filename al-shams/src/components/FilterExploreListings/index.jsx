import React, { useState } from "react";
import "./filterExploreListings.scss";
import ProductCard from "../ProductCard";
import images from "../../assets/images";
import InlineFilters from "../InlineFilters";
import { Link } from "react-router-dom";

const productData = {
  recent: [
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
      title: "2020 Honda Civic",
      description: "Featured product description.",
      location: "Lahore, Pakistan",
      milage: "10,000 km",
      type: "Used",
      transmission: "Automatic",
      model: "2020",
      starting: "Starting bid",
      price: "$20,000",
      image: images.car2,
      alt: "product2",
      link: "/",
    },
    {
      title: "2018 Ford Mustang",
      description: "Featured product description.",
      location: "Islamabad, Pakistan",
      milage: "15,000 km",
      type: "Used",
      transmission: "Manual",
      model: "2018",
      starting: "Starting bid",
      price: "$25,000",
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
    {
      title: "2020 Honda Civic",
      description: "Featured product description.",
      location: "Lahore, Pakistan",
      milage: "10,000 km",
      type: "Used",
      transmission: "Automatic",
      model: "2020",
      starting: "Starting bid",
      price: "$20,000",
      image: images.car2,
      alt: "product2",
    },
    {
      title: "2018 Ford Mustang",
      description: "Featured product description.",
      location: "Islamabad, Pakistan",
      milage: "15,000 km",
      type: "Used",
      transmission: "Manual",
      model: "2018",
      starting: "Starting bid",
      price: "$25,000",
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
    {
      title: "2020 Honda Civic",
      description: "Featured product description.",
      location: "Lahore, Pakistan",
      milage: "10,000 km",
      type: "Used",
      transmission: "Automatic",
      model: "2020",
      starting: "Starting bid",
      price: "$20,000",
      image: images.car2,
      alt: "product2",
      link: "/",
    },
  ],
  featured: [
    {
      title: "2020 Honda Civic",
      description: "Featured product description.",
      location: "Lahore, Pakistan",
      milage: "10,000 km",
      type: "Used",
      transmission: "Automatic",
      model: "2020",
      starting: "Starting bid",
      price: "$20,000",
      image: images.car2,
      alt: "product2",
      link: "/",
    },
    {
      title: "2018 Ford Mustang",
      description: "Featured product description.",
      location: "Islamabad, Pakistan",
      milage: "15,000 km",
      type: "Used",
      transmission: "Manual",
      model: "2018",
      starting: "Starting bid",
      price: "$25,000",
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
    {
      title: "2020 Honda Civic",
      description: "Featured product description.",
      location: "Lahore, Pakistan",
      milage: "10,000 km",
      type: "Used",
      transmission: "Automatic",
      model: "2020",
      starting: "Starting bid",
      price: "$20,000",
      image: images.car2,
      alt: "product2",
      link: "/",
    },
  ],
  popular: [
    {
      title: "2018 Ford Mustang",
      description: "Popular product description.",
      location: "Islamabad, Pakistan",
      milage: "15,000 km",
      type: "Used",
      transmission: "Manual",
      model: "2018",
      starting: "Starting bid",
      price: "$25,000",
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
      alt: "product1",
      link: "/",
    },
    {
      title: "2020 Honda Civic",
      description: "Featured product description.",
      location: "Lahore, Pakistan",
      milage: "10,000 km",
      type: "Used",
      transmission: "Automatic",
      model: "2020",
      starting: "Starting bid",
      price: "$20,000",
      image: images.car2,
      alt: "product2",
      link: "/",
    },
    {
      title: "2018 Ford Mustang",
      description: "Popular product description.",
      location: "Islamabad, Pakistan",
      milage: "15,000 km",
      type: "Used",
      transmission: "Manual",
      model: "2018",
      starting: "Starting bid",
      price: "$25,000",
      image: images.car3,
      alt: "product3",
      link: "/",
    },
  ],
};

const FilterExploreListings = (props) => {
  const [selectedFilter, setSelectedFilter] = useState("recent");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <section className="filter-explore-listings">
      <div className="filter-explore-listings__container">
        <div className="filter-explore-listings__container__topbar">
          <h2 className="filter-explore-listings__container__heading">
            Explore All Vehicles
          </h2>
          {/* <InlineFilters onFilterChange={handleFilterChange} /> */}
        </div>
        <div className="filter-explore-listings__container__products">
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
        <Link
          to={"/listings/inventory"}
          className="filter-explore-listings__container__button dark-button"
        >
          View All Cars
        </Link>
      </div>
    </section>
  );
};

export default FilterExploreListings;
