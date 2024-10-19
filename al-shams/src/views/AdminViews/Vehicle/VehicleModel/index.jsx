import React, { useState, useEffect } from "react";
import "./vehicleModel.scss";
import { AnimatedPage, DynamicTable } from "../../../../components";
import {
  getVehicleModels,
  addVehicleModel,
  editVehicleModel,
  deleteVehicleModel,
  getVehicleMakes,
} from "../../../../services/vehicleApis";
import { SuperBalls } from "@uiball/loaders";

const VehicleModel = ({ type }) => {
  const [vehicleModels, setVehicleModels] = useState([]);
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMakeData = async () => {
    try {
      setIsLoading(true);
      const makes = await getVehicleMakes(type === "machinery" ? "machinery" : "car");
      const extractedData = makes.map((item) => ({
        id: item._id,
        make: item.make,
      }));
      setVehicleMakes(extractedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchModelData = async () => {
    try {
      setIsLoading(true);
      const models = await getVehicleModels(type === "machinery" ? "machinery" : "car");
      const extractedData = models.map((item) => ({
        id: item._id,
        modelId: item.modelId,
        model: item.model,
        make: item.make?.make,
      }));
      setVehicleModels(extractedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMakeData();
    fetchModelData();
  }, []);

  const modalFields = [
    {
      name: "make",
      label: "Make",
      type: "select",
      options: vehicleMakes.map((make) => ({
        label: make.make,
        value: make.id,
      })),
    },
    {
      name: "model",
      label: "Vehicle Model",
      type: "text",
      placeholder: "Enter vehicle model",
    },
  ];

  const handleAdd = async (newModel) => {
    const newAddedModel = await addVehicleModel(newModel);
    // console.log(newAddedModel)
    // const extractedModel = newAddedModel.map((item) => ({
    //     id: item._id,
    //     modelId: item.modelId,
    //     model: item.model,
    //     make: item.make?.make,
    // }));
    // setVehicleModels([...vehicleModels, ...extractedModel]);
    fetchModelData();
  };

  const handleEdit = async (updateModel) => {
    const id = updateModel.get("id");
    const existingModel = vehicleModels.find(item => item.id === id);
    updateModel.forEach((value, key) => {
      if (existingModel && existingModel[key] === value) {
        updateModel.delete(key); // Remove unchanged fields
      } else {
      }
    });
    await editVehicleModel(id, updateModel);
    fetchModelData();
  };

  // const handleDelete = async (machineToDelete) => {
  //   console.log(await deleteVehicleModel(machineToDelete.id));
  //   setVehicleModels(
  //     vehicleModels.filter((item) => item.id !== machineToDelete.id)
  //   );
  // };

  const columns = [
    { header: "ID", field: "modelId", flexGrow: 1 },
    { header: "Vehicle Model", field: "model", flexGrow: 2 },
    { header: "Vehicle Make", field: "make", flexGrow: 2 },
  ];

  const actions = [
    { label: "Edit", handler: handleEdit },
    // { label: "Delete", handler: handleDelete },
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
      <div className="vehicle-model">
        <DynamicTable
          heading={type === "machinery" ? "Machinery Models" : "Vehicle Models"}
          columns={columns}
          data={vehicleModels}
          modalFields={modalFields}
          onAdd={handleAdd}
          onEdit={handleEdit}
          // onDelete={handleDelete}
          actions={actions} // Pass actions dynamically
        />
      </div>
    </AnimatedPage>
  );
};

export default VehicleModel;
