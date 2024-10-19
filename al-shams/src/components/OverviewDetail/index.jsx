import React from "react";
import "./overviewDetail.scss";

const OverviewDetail = (props) => {
  return (
    <div className="overview-detail">
      <div className="overview-detail__container">
        <p
          className={`overview-detail__container__info-name detail-${props.class}`}
        >
          {props.name}
        </p>
        <p className="overview-detail__container__info-value">{props.value}</p>
      </div>
      <hr className="overview-detail__hr"/>
    </div>
  );
};

export default OverviewDetail;
