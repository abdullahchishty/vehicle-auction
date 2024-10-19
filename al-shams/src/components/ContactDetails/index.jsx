import React from "react";
import "./contactDetails.scss";
import ContactInfo from "./ContactInfo";

const contactInfoList = [
  {
    class: "address",
    heading: "Address",
    info: "5-26-12 Hillside Terrace U 103 Nishi Gotanda Shinagawa-Ku Tokyo, Japan 141-0031",
  },
  {
    class: "email",
    heading: "Email",
    info: "info@alshamscorporation.com",
  },
  {
    class: "phone",
    heading: "Tel",
    info: "+81 80-2055-4445",
  },
  {
    class: "phone",
    heading: "Fax",
    info: "03-5496-2945",
  },
];

const ContactDetails = () => {
  return (
    <div className="contact-details">
      <div className="contact-details__container">
        <h2 className="contact-details__container__heading">Contact details</h2>
        <p className="contact-details__container__tagline">
          Get in touch with us for any inquiries, feedback, or support — we're here to help!
        </p>

        {contactInfoList.map((contactInfo) => (
          <ContactInfo
            key={contactInfo.class}
            class={contactInfo.class}
            heading={contactInfo.heading}
            info={contactInfo.info}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
