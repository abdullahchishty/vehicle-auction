import React from "react";
import "./aboutUs.scss";
import {
  AboutAlShams,
  AboutMission,
  AnimatedPage,
  BreadCrum,
  VerifyAuctionSheet,
  WhyChoose,
} from "../../../components";

const AboutUs = () => {
  return (
    <AnimatedPage>
      <div className="about-us">
        <div className="about-us__container">
          <BreadCrum
            items={[
              { text: "Home", href: "/" },
              { text: "About Us", href: "/about-us" },
            ]}
          />
          <AboutAlShams />
          <WhyChoose />
          <AboutMission />
          <VerifyAuctionSheet />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AboutUs;
