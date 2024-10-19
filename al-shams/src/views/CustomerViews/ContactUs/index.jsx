import React from "react";
import {
  AnimatedPage,
  BreadCrum,
  ContactDetails,
  GetInTouch,
  Offices,
} from "../../../components";
import BankDetails from "../../../components/BankDetails"
import "./contactUs.scss";

const ContactUs = () => {
  return (
    <AnimatedPage>
      <div className="contact-us">
        <div className="contact-us__container">
          <BreadCrum
            items={[
              { text: "Home", href: "/" },
              { text: "Contact Us", href: "/contact-us" },
            ]}
          />
          <div className="contact-us__container__get_in_touch">
            <GetInTouch />
            <div className="contact-us__container__get_in_touch__right">
              <ContactDetails />
              <BankDetails />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ContactUs;
