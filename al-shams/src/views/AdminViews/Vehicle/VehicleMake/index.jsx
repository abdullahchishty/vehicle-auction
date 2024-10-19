import React, { useState, useEffect } from "react";
import "./vehicleMake.scss";
import { AnimatedPage, DynamicTable } from "../../../../components";
import {
  getVehicleMakes,
  addVehicleMake,
  editVehicleMake,
  deleteVehicleMake,
} from "../../../../services/vehicleApis";
import { SuperBalls } from "@uiball/loaders";

const VehicleMake = ({ type }) => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const makes = await getVehicleMakes(type === "machinery" ? "machinery" : "car");

      const extractedData = makes.map((item) => (
        {
          id: item._id,
          makeId: item.makeId,
          make: item.make,
          type: item.type,
        }));
      setVehicleMakes(extractedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const modalFields = [
    {
      name: "make",
      label: "Vehicle Make",
      type: "text",
      placeholder: "Enter vehicle make",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [type === "machinery" ? { label: "Machinery", value: "machinery" } : { label: "Car", value: "car" }],
    },
  ];

  const handleAdd = async (newMake) => {
    const newAddedMake = await addVehicleMake(newMake);
    const extractedMake = newAddedMake.map((item) => ({
      id: item._id,
      makeId: item.makeId,
      make: item.make,
    }));
    setVehicleMakes([...vehicleMakes, ...extractedMake]);
    fetchData();
  };

  const handleEdit = async (updateMake) => {
    const id = updateMake.get("id");
    await editVehicleMake(id, updateMake);
    fetchData();
  };

  const handleDelete = async (machineToDelete) => {
    await deleteVehicleMake(machineToDelete.id);
    setVehicleMakes(
      vehicleMakes.filter((item) => item.id !== machineToDelete.id)
    );
  };

  const columns = [
    { header: "ID", field: "makeId", flexGrow: 1 },
    { header: "Vehicle Make", field: "make", flexGrow: 2 },
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
      <div className="vehicle-make">
        <DynamicTable
          heading={type === "machinery" ? "Machinery Makes" : "Vehicle Makes"}
          columns={columns}
          data={vehicleMakes}
          modalFields={modalFields}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={actions} // Pass actions dynamically
        />
      </div>
    </AnimatedPage>
  );
};

export default VehicleMake;
