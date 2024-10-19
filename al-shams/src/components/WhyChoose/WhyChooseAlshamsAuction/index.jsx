import React from "react";
import "./whyChooseAlshamsAuction.scss";
import WhyChooseFeatures from "../WhyChooseFeatures";

const boxes = [
  {
    image: "authenticity",
    heading: "Authenticity and Precision",
    description: "Get actual auction grade, mileage,and condition."
  },  
  {
    image: "carHistory",
    heading: "History of the Car",
    description: "Protection from repaired and accidental vehicles."
  },  
  {
    image: "coveragePlan",
    heading: "Authentic Report",
    description: "Helps in identifying scam and accidental vehicles."
  },  
  {
    image: "secureTransaction",
    heading: "Stay Fraudulent Free",
    description: "Avoid buying tapered or reversed meter vehicles."
  },  
]

const WhyChooseAlshamsAuction = () => {
  return (
   <div className="whyChoose-container">
      <h1 className="whyChoose-container__h">Why choose Al Shams Auction Sheet Verification?</h1>
      <p className="whyChoose-container__p">All imported Japanese cars come with an auction sheet that contains complete information about the vehicle. From its exterior to its interior.</p>
      <div className="why-choose__container" style={{padding: "16px"}}>
        {
          boxes.map((box, index) => (
            <WhyChooseFeatures 
              key={index}
              image={box.image}
              heading={box.heading}
              description={box.description}
            />
          ))
        }
      </div>
   </div>
  );
};

export default WhyChooseAlshamsAuction;
