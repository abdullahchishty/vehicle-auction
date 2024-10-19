import React, { useState, useEffect } from "react";
import "./vehicleCategory.scss";
import { AnimatedPage, DynamicTable } from "../../../../components";
import {
  getVehicleCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "../../../../services/vehicleApis";
import { SuperBalls } from "@uiball/loaders";

const VehicleCategory = () => {
  // const [vehicleMakes, setVehicleMakes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [vehicleCategory, setVehicleCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);

  // Helper function to recursively flatten categories
  const flattenCategories = (category) => {
    let flatData = [];

    // Add the current category (parent or child)
    flatData.push({
      id: category._id,
      categoryId: category.categoryId,
      name: category.name,
      image: category.image,
    });

    // Recursively add children, if they exist
    if (category.children && category.children.length > 0) {
      category.children.forEach((child) => {
        flatData = flatData.concat(flattenCategories(child));
      });
    }

    return flatData;
  };

  const fetchData = async () => {
    try {
      const categories = await getVehicleCategories();

      const extractedData = categories.reduce((acc, item) => {
        return acc.concat(flattenCategories(item));
      }, []);
      setParentCategory(extractedData);
      setIsLoading(true);
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
      name: "parentCategory",
      label: "Parent Category",
      type: "select",
      options: parentCategory.map((item) => ({
        label: item.name,
        value: item.id,
      })),
      required: false,
    },
    {
      name: "name",
      label: "Vehicle Category",
      type: "text",
      placeholder: "Enter vehicle category",
    },
    {
      name: "image",
      label: "Upload Image",
      type: "file",
      accept: "image/svg", // Specify the allowed file types
      placeholder: "Upload image",
    },
  ];

  const handleAdd = async (newMake) => {
    await addCategory(newMake);
    fetchData();
  };

  const handleEdit = async (updateMake) => {
    const id = updateMake.get("id");
    await editCategory(id, updateMake);
    fetchData();
  };

  const handleDelete = async (machineToDelete) => {
    await deleteCategory(machineToDelete.id);
    fetchData();
  };

  const columns = [
    { header: "ID", field: "categoryId", flexGrow: 1 },
    { header: "Vehicle Category", field: "name", flexGrow: 2 },
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
      <div className="vehicle-category-page">
        <DynamicTable
          heading={"Categories"}
          columns={columns}
          data={parentCategory}
          modalFields={modalFields}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={actions} // Pass actions dynamically
          showImage={true} // Control whether to show images or not
        />
      </div>
    </AnimatedPage>
  );
};

export default VehicleCategory;
