import React, { useState, useEffect } from "react";
import { CountCard } from "../../../components";
import "./adminDashboard.scss";
import Vehicles from "../Vehicle/Vehicles";
import {
  getTotalAuctionVerification,
  getTotalVehicles,
} from "../../../services/vehicleApis";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    totalVehicles: 0,
    totalMachinery: 0,
    totalAuctionVerifications: 0,
    totalShipments: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const vehiclesCount = await getTotalVehicles();
        // const machineryCount = await
        // const auctionVerificationsCount = await getTotalAuctionVerification();
        // const shipmentsCount = await
        setCounts({
          totalVehicles: vehiclesCount,
          totalMachinery: "--",
          totalAuctionVerifications: "--",
          totalShipments: "--",
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__count-cards-row">
        <CountCard
          className="admin-dashboard__count-card"
          heading="Total Vehicles"
          number={counts.totalVehicles}
          svgClass="vehicle-class"
        />
        <CountCard
          className="admin-dashboard__count-card"
          heading="Total Machinery"
          number={counts.totalMachinery}
          svgClass="machinery-class"
        />
        <CountCard
          className="admin-dashboard__count-card"
          heading="Total Auction Verifications"
          number={counts.totalAuctionVerifications}
          svgClass="auction-class"
        />
        <CountCard
          className="admin-dashboard__count-card"
          heading="Total Shipments"
          number={counts.totalShipments}
          svgClass="shipment-class"
        />
      </div>
      <div className="admin-dashboard__vehicles-component">
        <Vehicles dashboard={true} />
      </div>
      <div className="admin-dashboard__machinery-component">
        <Vehicles type="machinery" dashboard={true} />
      </div>
    </div>
  );
};

export default AdminDashboard;
