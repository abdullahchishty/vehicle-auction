import React from "react";
import "./listingDetailInfo.scss";

const ListingDetailInfo = (props) => {
  return (
    <div className="listing-detail-info">
      <h2 className="listing-detail-info__heading">{props.heading}</h2>
      <div className="listing-detail-info__container">
        <div className="listing-detail-info__container__details">
          {Object.entries(props.listingDetailInfo).map(([key, value], index) => {
            if (index % 2 === 0) {
              return (
                <span>
                  <div className="listing-detail-info__container__details__detail">
                    <p className="listing-detail-info__container__details__item">
                      {key}
                    </p>
                    <p className="listing-detail-info__container__details__value">
                      {value}
                    </p>
                  </div>
                  <hr className="overview-detail__hr"/>
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="listing-detail-info__container__details">
          {Object.entries(props.listingDetailInfo).map(([key, value], index) => {
            if (index % 2 !== 0) {
              return (
                <span>
                  <div className="listing-detail-info__container__details__detail">
                    <p className="listing-detail-info__container__details__item">
                      {key}
                    </p>
                    <p className="listing-detail-info__container__details__value">
                      {value}
                    </p>
                  </div>
                  <hr className="overview-detail__hr"/>
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailInfo;
