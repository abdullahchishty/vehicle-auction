import React from "react";
import "./chooseUs.scss";
import ChooseUsFeatures from "./Features";
import images from "../../assets/images";
import { Link } from "react-router-dom";

const ChooseUsList = [
  {
    image: images.f1,
    alt: "choose-us-1",
    heading: "Special Financing Offers",
    text: "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    image: images.f2,
    alt: "choose-us-2",
    heading: "Trusted Car Dealership",
    text: "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    image: images.f3,
    alt: "choose-us-3",
    heading: "Transparent Pricing",
    text: "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    image: images.f4,
    alt: "choose-us-4",
    heading: "Expert Car Service",
    text: "Our stress-free finance department that can find financial solutions to save you money.",
  },
];

const ChooseUs = () => {
  return (
    <section className="choose-us">
      <div className="choose-us__container">
        <h2 className="choose-us__container__heading">Why Choose Us?</h2>
        <div className="choose-us__container__features">
          {ChooseUsList.map((feature, index) => (
            <ChooseUsFeatures
              key={index}
              image={feature.image}
              alt={feature.alt}
              heading={feature.heading}
              text={feature.text}
            />
          ))}
        </div>

        <Link
          to={"/contact-us"}
          className="choose-us__container__button button"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default ChooseUs;
