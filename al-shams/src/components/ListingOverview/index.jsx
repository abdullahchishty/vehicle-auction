import React from "react";
import "./listingOverview.scss";
import OverviewDetail from "../OverviewDetail";

const ListingOverview = ({ overviewDetails }) => {
  return (
    <div className="listing-overview">
      <div className="listing-overview__container">
        <h2 className="listing-overview__container__heading">Car Overview</h2>
        <div className="listing-overview__container__details">
          <div className="listing-overview__container__details__detail">
            {overviewDetails
              .filter((detail, index) => index % 2 === 0)
              .map((detail, index) => (
                <OverviewDetail
                  key={index}
                  name={detail.name}
                  value={detail.value}
                  class={detail.class}
                />
              ))}
          </div>
          <div className="listing-overview__container__details__detail">
            {overviewDetails
              .filter((detail, index) => index % 2 !== 0)
              .map((detail, index) => (
                <OverviewDetail
                  key={index}
                  name={detail.name}
                  value={detail.value}
                  class={detail.class}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingOverview;
