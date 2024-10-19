import React from "react";
import "./whyChoose.scss";
import WhyChooseFeatures from "./WhyChooseFeatures";

const Features = [
  {
    image: "finance",
    heading: "Special Financing Offers",
    description:
      "Our stress-free finance department that can find financial solutions to save you money and condition.",
  },
  {
    image: "trusted",
    heading: "Trusted Car Dealership",
    description:
      "Our stress-free finance department that can find financial solutions to save you money and condition.",
  },
  {
    image: "pricing",
    heading: "Transparent Pricing",
    description:
      "Our stress-free finance department that can find financial solutions to save you money and condition.",
  },
  {
    image: "expert",
    heading: "Expert Car Service",
    description:
      "Our stress-free finance department that can find financial solutions to save you money and condition.",
  },
];

const WhyChoose = () => {
  return (
    <div className="why-choose">
      <h2 className="why-choose__heading">Why choose Al Shams Auction?</h2>
      <p className="why-choose__tagline">
        All imported Japanese cars come with an auction sheet that contains
        complete information about the vehicle. From its exterior to its
        interior.
      </p>
      <div className="why-choose__container">
        {Features.map((feature, index) => (
          <WhyChooseFeatures
            key={index}
            image={feature.image}
            heading={feature.heading}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
