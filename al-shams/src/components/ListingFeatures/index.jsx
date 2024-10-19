import React, { useEffect, useState } from "react";
import "./listingFeatures.scss";
import ListingFeature from "./ListingFeature";

const ListingFeatures = ({ FEATURES }) => {

  const [features, setFeatures] = useState({
    box1: [],
    box2: [],
    box3: [],
    box4: [],
  })

  // useEffect(() => {
  //   let i = 0;
  //   const features = { ... features };
  //   for (const feature of FEATURES) {
  //       features[`box${(i%4)+1}`].push(feature.name);
  //       i++;
  //   }
  //   setFeatures(features);
  // }, [])

  useEffect(() => {    
    if (FEATURES) {
      const newFeatures = {
        box1: [],
        box2: [],
        box3: [],
        box4: [],
      };
    
      let i = 0;
      for (const feature of FEATURES) {
        newFeatures[`box${(i % 4) + 1}`].push(feature.name);
        i++;
      }
      setFeatures(newFeatures); 
    }
  }, [])


  return (
    <div className="listing-features">
      <h2 className="listing-features__heading">Features</h2>
      <div className="listing-features__container">
        <ListingFeature features={features.box1} />
        <ListingFeature features={features.box2} />
        <ListingFeature features={features.box3} />
        <ListingFeature features={features.box4} />
      </div>
    </div>
  );
};

export default ListingFeatures;
