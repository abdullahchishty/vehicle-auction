import React, { useState } from "react";
import images from "../../assets/images";
import "./vehicleCategories.scss";
import VehicleCategory from "./VehicleCategory";
import CarouselComponent from "../Carousal";

const vehicleCategoriesList = [
  <VehicleCategory
    key="suv"
    link={"/listings/inventory?category=suv"}
    icon={images.suv}
    text={"SUV"}
  />,
  <VehicleCategory
    key="sedan"
    link={"/listings/inventory?category=sedan"}
    icon={images.sedan}
    text={"Sedan"}
  />,
  <VehicleCategory
    key="hatchback"
    link={"/listings/inventory?category=hatchback"}
    icon={images.hatchback}
    text={"Hatchback"}
  />,
  <VehicleCategory
    key="coupe"
    link={"/listings/inventory?category=coupe"}
    icon={images.coupe}
    text={"Coupe"}
  />,
  <VehicleCategory
    key="hybrid"
    link={"/listings/inventory?category=hybrid"}
    icon={images.hybrid}
    text={"Hybrid"}
  />,
  <VehicleCategory
    key="convertible"
    link={"/listings/inventory?category=convertible"}
    icon={images.convertible}
    text={"Convertible"}
  />,
  <VehicleCategory
    key="van"
    link={"/listings/inventory?category=van"}
    icon={images.van}
    text={"Van"}
  />,
  <VehicleCategory
    key="electric"
    link={"/listings/inventory?category=electric"}
    icon={images.electric}
    text={"Electric"}
  />,
];

function VehicleCategories({ vehicleCategoriesList }) {
  vehicleCategoriesList = vehicleCategoriesList.map(item => (
    <VehicleCategory
      key={item.name}
      link={`/listings/inventory?category=${item.id}`}
      icon={`${import.meta.env.VITE_API_BASE_URL}/${item.image}`}
      text={item.name}
    />
  ))
  return (
    <section className="vehicle-categories">
      <div className="vehicle-categories__container">
        <h2 className="vehicle-categories__container__heading">
          Browse by top categories
        </h2>
        <p className="vehicle-categories__container__tagline tagline">
          Browse through categories tailored to your preferences, featuring the
          most sought-after models and brands.
        </p>
        <div className="vehicle-categories__container__category-wrapper desktop-categories-container">
          {vehicleCategoriesList}
        </div>
        <div className="vehicle-categories__container__category-wrapper mobile-categories-container">
          <CarouselComponent sliderList={vehicleCategoriesList} />
        </div>
      </div>
    </section>
  );
}

export default VehicleCategories;
