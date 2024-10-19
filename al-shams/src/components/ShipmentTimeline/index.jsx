import React from "react";
import TimeLineBox from "../TimeLineBox";

function ShipmentTimeline({ timeline }) {
  return (
    <div className="shipment-details-container__timeline-container" >
      {timeline.map(item => <TimeLineBox image={item.image} status={item.status} date={item.date} time={item.time} isAchieved={item.isAchieved}/>)}
    </div>
  );
}

export default ShipmentTimeline;
