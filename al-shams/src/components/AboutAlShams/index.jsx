import React from "react";
import "./aboutAlShams.scss";
import { Link } from "react-router-dom";

const AboutAlShams = () => {
  return (
    <div className="about-al-shams">
      <h2 className="about-al-shams__heading">About Us</h2>
      <div className="about-al-shams__container">
        <h2 className="about-al-shams__container__heading">
          What Is Al-Shams?
        </h2>
        <p className="about-al-shams__container__tagline">
          At AL SHAMS, we bring you the best in vehicle auctions from Japan.
          With years of experience and a commitment to excellence, we connect
          buyers and sellers with seamless, transparent transactions. Discover
          how we’re setting the standard in the automotive auction industry.
        </p>
        <div className="about-al-shams__container__buttons">
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
    </div>
  );
};

export default AboutAlShams;
