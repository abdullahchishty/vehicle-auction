import React from "react";
import "./contactInfo.scss";

const ContactInfo = (props) => {
  return (
    <div className={`contact-detail-info ${props.class}`}>
      <div className="contact-detail-info__container">
        <h2 className="contact-detail-info__container__heading ">
          {props.heading}
        </h2>
        <p className="contact-detail-info__container__tagline">{props.info}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
