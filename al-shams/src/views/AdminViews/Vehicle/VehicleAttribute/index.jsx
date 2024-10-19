import React, { useState, useEffect } from "react";
import { AnimatedPage, DynamicTable } from "../../../../components";
import {
  getVehicleFeature,
  deleteVehicleFeature,
  editVehicleFeature,
  addVehicleFeature,
  getVehicleAttributes,
  deleteVehicleAttribute,
  getVehicleCategories,
  addVehicleAttribute,
  editVehicleAttribute
} from "../../../../services/vehicleApis";
import { SuperBalls } from "@uiball/loaders";

const flattenCategories = (category) => {
  let flatData = [];

  flatData.push({
    id: category._id,
    categoryId:category.categoryId,
    name: category.name,
    image: category.image,
  });

  if (category.children && category.children.length > 0) {
    category.children.forEach((child) => {
      flatData = flatData.concat(flattenCategories(child));
    });
  }

  return flatData;
};

const VehicleAttribute = () => {
  const [vehicleAttributes, setVehicleAttributes] = useState([]);
  const [attributeFeatures, setAttributeFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const attributes = await getVehicleAttributes();
      const extractedData = attributes.map((item) => ({
        _id: item._id,
        attributeId: item.attributeId,
        name: item.name,
        category: item.category.name,
        attributes: (item.attributeFeatures.map(obj => obj.name)).join(", ")
      }));
      const categories = await getVehicleCategories();
      const extractedCategories = categories.reduce((acc, item) => {
        return acc.concat(flattenCategories(item));
      }, []);
      const newAttributeFeatures = []
      for (const attribute of attributes) {
        for (const attributeFeature of attribute.attributeFeatures) {
          newAttributeFeatures.push({
            attributeId: attribute.attributeId,
            attributeName: attribute.name,
            featureName: attributeFeature.name
          })
        }
      }
      setCategories(extractedCategories);
      setVehicleAttributes(extractedData);
      setAttributeFeatures(newAttributeFeatures)
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
      label: "Machinery Attributes",
      type: "text",
      placeholder: "Enter a machiney attribute",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: categories.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    },
    {
      name: "attributes",
      label: "Attribute Features",
      type: "text",
      placeholder: "Enter comma separated features e.g f1, f2, f3",
    },
  ];

  const handleAdd = async (newAttribute) => {
    const newAddedFeature = await addVehicleAttribute(newAttribute);
    fetchData();
  };

  const handleEdit = async (updateAttribute) => {
    const id= updateAttribute.get("_id")
    await editVehicleAttribute(id, updateAttribute);
    fetchData();
  };

  const handleDelete = async (attributeToDelete) => {
    await deleteVehicleAttribute(attributeToDelete._id);
    fetchData();
  };

  const columns = [
    { header: "ID", field: "attributeId", flexGrow: 1 },
    { header: "Attribute Name", field: "name", flexGrow: 2 },
  ];

  const attributeFeaturesColumns = [
    { header: "Attribute ID", field: "attributeId", flexGrow: 1 },
    { header: "Attribute Name", field: "attributeName", flexGrow: 2 },
    { header: "Feature Name", field: "featureName", flexGrow: 2 },
  ]

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
      <div className="vehicle-feature my-vehicle-feature">
        <DynamicTable
          heading={"Machinery Attributes"}
          columns={columns}
          data={vehicleAttributes}
          modalFields={modalFields}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={actions}
        />
      </div>
      <div className="vehicle-feature my-vehicle-feature">
        <DynamicTable
          heading={"Attribute Features"}
          columns={attributeFeaturesColumns}
          data={attributeFeatures}
        />
      </div>
    </AnimatedPage>
  );
};

export default VehicleAttribute;
