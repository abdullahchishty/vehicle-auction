import React from "react";

function TimeLineBox({ image, status, date, time, isAchieved}) {
  return (
    <div className={'shipment-details-container__timeline-container__box'+(isAchieved ? '__achieved' : '__not-achieved')}>
      <img src={image} className="shipment-details-container__timeline-container__box__image"/>
      <div>
        <div className="shipment-details-container__timeline-container__box__text-container">
        <span className="shipment-details-container__timeline-container__box__text-container__status">Status</span>
        <span>{status}</span>
        </div>
        <div className="shipment-details-container__timeline-container__box__date-time-container">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default TimeLineBox;
