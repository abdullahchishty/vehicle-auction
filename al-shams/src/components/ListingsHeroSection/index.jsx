import React from "react";
import "./listingsHeroSection.scss";

const ListingsHeroSection = () => {
  return (
    <section className="filter-hero-section">
      <div className="filter-hero-section__container">
        <h1 className="filter-hero-section__title">
          Your Ultimate Destination for Vehicle Auctions
        </h1>
        <p className="filter-hero-section__subtitle">
          Home / <span>Listing</span>
        </p>
      </div>
    </section>
  );
};

export default ListingsHeroSection;
