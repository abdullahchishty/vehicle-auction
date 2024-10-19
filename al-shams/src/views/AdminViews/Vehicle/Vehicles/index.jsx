import React, { useState, useEffect } from "react";
import "./vehicles.scss";
import { AnimatedPage, DynamicTable } from "../../../../components";
import {
  getVehicles,
  addVehicle,
  editVehicle,
  deleteVehicle,
} from "../../../../services/vehicleApis";
import { SuperBalls } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";

const Vehicles = ({ type, dashboard }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const vehiclesData = await getVehicles(
        type === "machinery" ? "machinery" : "car"
      );
      const extractedData = vehiclesData.map((item) => ({
        id: item._id || "NA",
        category: item.CATEGORY?.name || "NA",
        VEHICLE_Id: item.VEHICLE_Id || "NA",
        condition: item.CONDITION || "NA",
        transmission: item.TRANSMISSION || "NA",
        color: item.COLOR || "NA",
        chasisNumber: item.CHASSIS_NUMBER || "NA",
        name: `${item.MARKA_NAME || ""} ${item.MODEL_NAME || ""}`,
        auctionsheet: item.AUCTION_SHEET || "NA",
        biddingPrice: item.PRICE || "NA",
      }));
      setVehicles(extractedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (newVehicle) => {
    const newAddedVehicle = await addVehicle(newVehicle);
    const extractedVehicle = newAddedVehicle.map((item) => ({
      id: item._id || "NA",
      category: item.CATEGORY || "NA",
      VEHICLE_Id: item.VEHICLE_Id || "NA",
      condition: item.CONDITION || "NA",
      transmission: item.TRANSMISSION || "NA",
      color: item.COLOR || "NA",
      chasisNumber: item.CHASSIS_NUMBER || "NA",
      name: `${item.MARKA_NAME} ${item.MODEL_NAME}`,
      auctionsheet: item.AUCTION_SHEET || "NA",
      biddingPrice: item.PRICE || "NA",
    }));
    setVehicles([...vehicles, ...extractedVehicle]);
    fetchData();
  };

  const handleEdit = (updatedVehicle) => {
    const id = updatedVehicle.id;
    navigation(`/admin-a1b2c3/vehicles/vehicle/${id}`);
  };

  const handleDelete = async (vehicleToDelete) => {
    await deleteVehicle(vehicleToDelete.id);
    setVehicles(vehicles.filter((item) => item.id !== vehicleToDelete.id));
  };

  const columns = [
    { header: "ID", field: "VEHICLE_Id", flexGrow: 2 },
    { header: "Category", field: "category", flexGrow: 2 },
    { header: "Vehicle Name", field: "name", flexGrow: 2 },
    { header: "Condition", field: "condition", flexGrow: 2 },
    { header: "Transmission", field: "transmission", flexGrow: 2 },
    { header: "Color", field: "color", flexGrow: 2 },
    { header: "Auction Sheet", field: "auctionsheet", flexGrow: 2 },
    { header: "Chasis Number", field: "chasisNumber", flexGrow: 2 },
    { header: "Bidding Price", field: "biddingPrice", flexGrow: 2 },
  ];

  const actions = [
    { label: "Edit", handler: handleEdit },
    { label: "Delete", handler: handleDelete },
  ];

  if (isLoading) {
    return (
      <AnimatedPage>
        <div className="loading-container">
          <SuperBalls />
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="vehicle">
        <DynamicTable
          heading={type === "machinery" ? "Machineries" : "Vehicles"}
          columns={columns}
          data={vehicles}
          // modalFields={modalFields}
          onAdd={dashboard ? false : handleAdd}
          onEdit={handleEdit}
          entity="admin-a1b2c3/vehicles/vehicle"
          onDelete={handleDelete}
          actions={dashboard ? false : actions}
          maxItems={dashboard ? 5 : undefined}
          manageLink={dashboard ? "/admin-a1b2c3/vehicles/vehicle" : undefined}
        />
      </div>
    </AnimatedPage>
  );
};

export default Vehicles;
