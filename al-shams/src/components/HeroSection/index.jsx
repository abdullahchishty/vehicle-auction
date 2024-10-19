import React from "react";
import "./heroSection.scss";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__container">
        <p className="hero-section__subtitle">
          We make finding the right car simple
        </p>
        <h1 className="hero-section__title">
          Your Ultimate Destination for Vehicle Auctions
        </h1>
        <div className="hero-section__buttons">
          <a href="/listings/inventory" target="_blank" className="hero-section__buttons__cta">
            View Inventory
          </a>
          <a
            href={"/contact-us"}
            target="_blank" 
            className="hero-section__buttons__cta transparent-cta"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
