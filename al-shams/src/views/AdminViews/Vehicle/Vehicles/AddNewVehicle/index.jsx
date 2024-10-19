import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationButton from "../../../../../components/NavigationButton";
import DynamicForm from "../../../../../components/DynamicForm";
import {
  getVehicleFeature,
  getVehicleMakes,
  getVehicleModels,
  addVehicle,
  getVehicleById,
  editVehicle,
  getVehicleCategories,
} from "../../../../../services/vehicleApis";
import "./addNewVehicle.scss";
import { toast } from "react-hot-toast";
import { AnimatedPage } from "../../../../../components";
import { SuperBalls } from "@uiball/loaders";
const flattenCategories = (category) => {
  let flatData = [];
  flatData.push({
    id: category._id,
    categoryId: category.categoryId,
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

const AddNewVehicle = () => {
  const [vehicleFeature, setVehicleFeatures] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const navigation = useNavigate();

  const formRefs = {
    overview: useRef(null),
    dimensions: useRef(null),
    engine: useRef(null),
  };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const fetchData = async () => {
        const vehicleData = await getVehicleById(id);
        setVehicleData(vehicleData.vehicles[0]);
        if (vehicleData.vehicles[0].MARKA_NAME) {
          setSelectedMakeId(vehicleData.vehicles[0].MARKA_NAME._id);
          handleMakeChange(vehicleData.vehicles[0].MARKA_NAME._id);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const features = await getVehicleFeature();
        const makeList = await getVehicleMakes();
        const Categories = await getVehicleCategories();
        const extractedData = Categories.reduce((acc, item) => {
          return acc.concat(flattenCategories(item));
        }, []);
        setCategories(extractedData);
        setVehicleFeatures(features);
        setMakes(makeList);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMakeChange = async (makeId) => {
    setSelectedMakeId(makeId);
    const selectedMake = makes.find((make) => make._id === makeId);
    if (selectedMake && selectedMake.models) {
      setModels(selectedMake.models);
    } else {
      const modelsList = await getVehicleModels(makeId);
      setModels(modelsList);
    }
  };

  const fields1 = [
    {
      name: "COUNTRY",
      label: "Country",
      type: "select",
      options: [
        { value: "pakistan", label: "Pakistan" },
        { value: "united-kingdom", label: "United Kingdom" },
        { value: "japan", label: "Japan" },
        { value: "kenya", label: "Kenya" },
      ],
    },
    {
      name: "MARKA_NAME",
      label: "Make",
      type: "select",
      options: makes.map((make) => ({ value: make._id, label: make.make })),
      onChange: handleMakeChange,
      required: true,
    },
    {
      name: "MODEL_NAME",
      label: "Model",
      type: "select",
      options: models.map((model) => ({
        value: model._id,
        label: model.model,
      })),
      disabled: !selectedMakeId,
      required: true,
    },
    {
      name: "CATEGORY",
      label: "Category",
      type: "select",
      options: categories.map((cateogory) => ({
        value: cateogory.id,
        label: cateogory.name,
      })),
      required: true,
    },
    { name: "YEAR", label: "Year", type: "number" },
    {
      name: "REGISTER_YEAR",
      label: "Registration Year",
      type: "number",
    },
    { name: "MILEAGE", label: "Mileage", type: "number", unit: "KM" },
    { name: "PRICE", label: "Price", type: "number", unit: "YEN" },
    { name: "ENGINE_NUMBER", label: "Engine Number", type: "text" },
    { name: "COLOR", label: "Exterior Color", type: "text" },
    { name: "CHASSIS_NUMBER", label: "Chassis Number", type: "text" },
    {
      name: "CONDITION",
      label: "Condition",
      type: "select",
      options: [
        { value: "new", label: "New" },
        { value: "used", label: "Used" },
      ],
    },
    {
      name: "TRANSMISSION",
      label: "Transmission",
      type: "select",
      options: [
        { value: "automatic", label: "Automatic" },
        { value: "manual", label: "Manual" },
      ],
    },
    {
      name: "FUEL_TYPE",
      label: "Fuel Type",
      type: "select",
      options: [
        { value: "petrol", label: "Petrol" },
        { value: "diesel", label: "Diesel" },
        { value: "hybrid", label: "Hybrid" },
        { value: "electric", label: "Electric" },
      ],
    },
  ];

  const fields2 = [
    { name: "LENGTH", label: "Length", type: "number" },
    { name: "WIDTH", label: "Width", type: "number" },
    { name: "HEIGHT", label: "Height", type: "number" },
    {
      name: "WIDTH_INCLUDING_MIRROR",
      label: "Width (Including Mirrors)",
      type: "number",
    },
    { name: "WHEEL_BASE", label: "Wheelbase", type: "number" },
    {
      name: "GROSS_WEIGHT",
      label: "Gross Vehicle Weight (Kg)",
      type: "number",
    },
    {
      name: "LUGGAGE_CAPACITY",
      label: "Luggage Capacity (Seats Up-Litres)",
      type: "number",
    },
    {
      name: "MAX_LOADING_WEIGHT",
      label: "Max Loading Weight (Kg)",
      type: "number",
    },
    { name: "NO_OF_SEATS", label: "No. of Seats", type: "number" },
  ];

  const fields3 = [
    {
      name: "FUEL_TANK_CAPACITY",
      label: "Fuel Tank Capacity (Litres)",
      type: "number",
    },
    {
      name: "MINIMUM_KERB_WEIGHT",
      label: "Minimum Kerbweight (Kg)",
      type: "number",
    },
    {
      name: "MAX_TOWING_WEIGHT_BRAKED",
      label: "Max. Towing Weight - Braked (Kg)",
      type: "number",
    },
    {
      name: "TURNING_CIRCLE",
      label: "Turning Circle - Kerb to Kerb (m)",
      type: "number",
    },
    {
      name: "MAX_TOWING_WEIGHT_UNBRAKED",
      label: "Max. Towing Weight - Unbraked (Kg)",
      type: "number",
    },
  ];
  const handleSubmitAllForms = async () => {
    const allFormsData = {};
    let isValid = true;

    Object.keys(formRefs).forEach((formId) => {
      const formRef = formRefs[formId].current;
      if (formRef) {
        const formData = formRef.getFormData();
        const formIsValid = formRef.isFormValid();

        if (!formIsValid) {
          isValid = false;
        }

        allFormsData[formId] = formData;
      }
    });

    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formattedData = {
      ...allFormsData.overview,
      ...allFormsData.dimensions,
      ...allFormsData.engine,
    };

    const formData = new FormData();
    // Handle regular form fields
    Object.entries(formattedData).forEach(([key, value]) => {
      if (
        key !== "IMAGES" &&
        key !== "AUCTION_SHEET" &&
        key !== "FEATURES" &&
        key !== "DESCRIPTION"
      ) {
        if (value !== undefined && value !== null) {
          if (typeof value === "object" && value !== null && "_id" in value) {
            formData.append(key, value._id);
          } else {
            formData.append(key, value.toString());
          }
        }
      }
    });
    if (Array.isArray(allFormsData.overview.features)) {
      formData.append("FEATURES", allFormsData.overview.features);
      formData.delete("features");
    }

    if (allFormsData.overview.description) {
      formData.append("DESCRIPTION", allFormsData.overview.description);
    }

    // Handle images
    if (allFormsData.overview.IMAGES) {
      allFormsData.overview.IMAGES.forEach((fileObj) => {
        if (fileObj && fileObj.file instanceof File) {
          formData.append("IMAGES", fileObj.file);
        }
      });
    }
    if (allFormsData.overview.images) {
      allFormsData.overview.images.forEach((fileObj) => {
        if (fileObj && fileObj.file instanceof File) {
          formData.append("IMAGES", fileObj.file);
        }
      });
    }
    if (allFormsData.overview.initialImages) {
      const initialImagesPreviews = allFormsData.overview.initialImages.map(
        (image) =>
          image.preview.replace(`${import.meta.env.VITE_API_BASE_URL}/`, "")
      );
      if (initialImagesPreviews.length > 0) {
        initialImagesPreviews.forEach((preview) => {
          formData.append("INITIAL_IMAGES", preview);
        });
      } else {
        formData.append("INITIAL_IMAGES", JSON.stringify([]));
      }
    }

    // Handle auction sheet
    if (allFormsData.overview.auctionSheet instanceof File) {
      formData.append("AUCTION_SHEET", allFormsData.overview.auctionSheet);
    }
    if (allFormsData.overview.onChangeCalled === undefined) {
      formData.delete("FEATURES");
    }

    const formDataObject = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);
      let response;
      if (!isEdit) {
        response = await addVehicle(formData);
      } else {
        response = await editVehicle(id, formData);
      }

      if (response && (response[0] || response._id)) {
        toast.success(
          isEdit
            ? "Vehicle has been edited successfully!"
            : "Vehicle has been added successfully!"
        );
        navigation(-1);
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error processing vehicle:", error);
      toast.error(
        error.message || "Failed to process vehicle. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    navigation(-1);
  };

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
      <div className="add-new-vehicle">
        <NavigationButton
          heading={isEdit ? "Edit Vehicle" : "Add New Vehicle"}
          className=""
          goBack
        />

        <DynamicForm
          ref={formRefs.overview}
          formId="overview"
          title="Car Overview Information"
          fields={fields1}
          features={vehicleFeature}
          imageSectionTitle="Upload Image Vehicles"
          descriptionHeading="Vehicle description"
          descriptPlaceholder="Something About the vehicle"
          columns={2}
          initialData={{
            ...vehicleData,
            MARKA_NAME: vehicleData.MARKA_NAME?._id,
            MODEL_NAME: vehicleData.MODEL_NAME?._id,
            CATEGORY: vehicleData.CATEGORY?._id,
          }}
          auctionSheetSection={true}
        />

        <DynamicForm
          ref={formRefs.dimensions}
          formId="dimensions"
          title="Dimension & Capacity"
          fields={fields2}
          columns={3}
          initialData={vehicleData}
        />

        <DynamicForm
          ref={formRefs.engine}
          formId="engine"
          title="Engine and Transmission"
          fields={fields3}
          columns={3}
          initialData={vehicleData}
        />

        <div className="add-new-vehicle__buttons">
          <button
            type="button"
            onClick={handleCancelForm}
            className="add-new-vehicle__buttons__cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmitAllForms}
            className="add-new-vehicle__buttons__submit"
          >
            Submit & Continue
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AddNewVehicle;
