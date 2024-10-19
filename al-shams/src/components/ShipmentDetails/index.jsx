import React, { useEffect, useState } from "react";
import BreadCrum from "../BreadCrum";
import { useParams } from 'react-router-dom';
import ShipmentHeader from '../ShipmentHeader';
import ShipmentTimeline from '../ShipmentTimeline';
import ShipmentVehicleDetails from '../ShipmentVehicleDetails';
import images from "../../assets/images";
import "./shipmentDetails.scss"

const TIMELINE = [
  {
    image: images.car2,
    status: "On way to the yard",
    date: "4th Sept 2023",
    time: "03:30pm",
    isAchieved: true
  },
  {
    image: images.car1,
    status: "Vehicles in yard",
    date: "4th Sept 2023",
    time: "03:30pm",
    isAchieved: true
  },
  {
    image: images.car3,
    status: "Loading Planned",
    date: "4th Sept 2023",
    time: "03:30pm",
    isAchieved: false
  },
  {
    image: images.auction1,
    status: "Vehicles Loaded",
    date: "4th Sept 2023",
    time: "03:30pm",
    isAchieved: false
  },
  {
    image: images.car1,
    status: "Shipped",
    date: "4th Sept 2023",
    time: "03:30pm",
    isAchieved: false
  },
  {
    image: images.auction2,
    status: "Arriving in next 15 days",
    date: "4th Sept 2023",
    time: "03:30pm",
    isAchieved: false
  },
];

const VEHICLE_DETAILS = {
  name: "Caterpillar 395 Pipelayer",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos asperiores iste excepturi fuga quia facilis? Accusantium obcaecati quae voluptatibus vitae, sed nisi culpa. Suscipit quis dignissimos, error dolore placeat officiis facilis quod, autem molestias nemo blanditiis dolorem odio necessitatibus quidem unde. Totam, asperiores deleniti voluptatibus sint aliquam necessitatibus vel suscipit voluptate. Voluptatem at eaque hic obcaecati pariatur perspiciatis tempore ducimus optio architecto numquam, eum beatae similique delectus, laborum veritatis! Ex, minus accusamus excepturi corporis soluta quia mollitia dolorum velit architecto dolor ratione maxime perferendis illum tenetur, pariatur deleniti obcaecati sunt facilis odit? Repellendus, deserunt. Itaque, dolorem. Aspernatur delectus amet illo? The Caterpillar 395 Pipelayer is engineered to deliver superior performance and reliability for heavy-duty pipeline operations. Designed to handle the toughest jobs, it features advanced technology and robust construction to ensure efficiency and durability.",
  price: '$'+Number(165000).toLocaleString(),
  additionalProps: {
    "Model": { img: "body", value: "Cat C15" },
    "Mileage": {img: "mileage", value: 250 },
    "Fuel Type": { img: "fuel", value: "Diesel" },
    "Year": { img: "year", value: 2200 },
    "Transmission": { img: "transmission", value: "Turbocharged" },
    "Drive Type": { img: "drive-type", value: "Heavy-duty with long-life seals" },
    "Condition": { img: "condition", value: "Used" },
    "Engine Size": { img: "engine", value: "440HP(328kW)" },
    "Flywheel Power": { img: "color", value: "238 kW" },
    "Color": { img: "color", value: "Black" },
    "Chassis Number": { img: "chasis", value: "FCB123792" },
  },
  images: [images.car2, images.car1, images.auction1, images.car3]
}

function ShipmentDetails() {
  const { id } = useParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [status, setStatus] = useState("Arrived");
  const [timeline, setTimeline] = useState(TIMELINE);
  const [vehicleDetails, setVehicleDetails] = useState(VEHICLE_DETAILS);

  useEffect(() => {
    setBreadcrumbs([
      {
        text: "Home",
        href: "/"
      },
      {
        text: "Profile",
        href: "/"
      },
      {
        text: "My Shipments",
        href: "/shipments"
      },
      {
        text: `Shipment#${id}`,
        href: "/"
      },
    ])
  }, [id])

  return (
    <div className="shipment-details-container__parent">
      <div className="shipment-details-container">
       <BreadCrum items={breadcrumbs} />
       <ShipmentHeader id={id} status={status} />
       <ShipmentTimeline timeline={timeline} />
       <ShipmentVehicleDetails vehicleDetails={vehicleDetails} />
      </div>
    </div>
  );
}

export default ShipmentDetails;
