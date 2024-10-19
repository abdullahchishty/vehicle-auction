import React, { useState, useEffect } from "react";
import { AnimatedPage, DynamicTable } from "../../../../components";
import "./vehicleFeature.scss"
import {
  getVehicleFeature,
  deleteVehicleFeature,
  editVehicleFeature,
  addVehicleFeature
} from "../../../../services/vehicleApis";
import { SuperBalls } from "@uiball/loaders";

const VehicleFeature = () => {
  const [vehicleFeatures, setVehicleFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const features = await getVehicleFeature();
      const extractedData = features.map((item) => ({
        id: item._id,
        featureId: item.featureId,
        name: item.name,
      }));
      setVehicleFeatures(extractedData);
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
      name: "name",
      label: "Vehicle Feature",
      type: "text",
      placeholder: "Enter vehicle feature",
    },
  ];

  const handleAdd = async (newFeature) => {
    const newAddedFeature = await addVehicleFeature(newFeature);
    const extractedFeature = newAddedFeature.map((item) => ({
      id: item._id,
      featureId: item.featureId,
      name: item.name,
    }));
    setVehicleFeatures([...vehicleFeatures, ...extractedFeature]);
  };

  const handleEdit = async (updateFeature) => {
    const id= updateFeature.get("id")
    await editVehicleFeature(id, updateFeature);
    fetchData();
  };

  const handleDelete = async (featureToDelete) => {
    await deleteVehicleFeature(featureToDelete.id);
    setVehicleFeatures(
      vehicleFeatures.filter((item) => item.id !== featureToDelete.id)
    );
  };

  const columns = [
    { header: "ID", field: "featureId", flexGrow: 1 },
    { header: "Feature Name", field: "name", flexGrow: 2 },
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
      <div className="vehicle-feature">
        <DynamicTable
          heading={"Features"}
          columns={columns}
          data={vehicleFeatures}
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

export default VehicleFeature;
