import { axiosInstance } from "../core/adminApi";

export const addVehicleModel = async (vehicleModel) => {
  try {
    const response = await axiosInstance.post(
      "/vehicle/model/add/",
      vehicleModel
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editVehicleModel = async (id, vehicleModel) => {
  try {
    const response = await axiosInstance.post(
      `/vehicle/model/update/?id=${id}`,
      vehicleModel
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getVehicleModels = async (type = "car") => {
  try {
    const response = await axiosInstance.get("/vehicle/model/get");
    return response.data.filter(model => model.make.type === type)
  } catch (error) {
    console.error(error);
  }
};

export const deleteVehicleModel = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/vehicle/model/delete/?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVehicleMakes = async (type = "car") => {
  try {
    const response = await axiosInstance.get(`/vehicle/make/get/?type=${type}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addVehicleMake = async (vehicleMake) => {
  try {
    const response = await axiosInstance.post(
      "/vehicle/make/add/",
      vehicleMake
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editVehicleMake = async (id, vehicleMake) => {
  try {
    const response = await axiosInstance.post(
      `/vehicle/make/update/?id=${id}`,
      vehicleMake
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVehicleMake = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/vehicle/make/delete/?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addCategory = async (category) => {
  try {
    const response = await axiosInstance.post("/category/create/", category);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVehicleCategories = async () => {
  try {
    const response = await axiosInstance.get("/category/get/");
    // let carCategory = null;
    
    // response.data.forEach((category) => {
    //   const car = category.children.find(
    //     (child) => child.name === "Cars" || child.name === "cars"
    //   );
    //   if (car) {
    //     carCategory = car;
    //   }
    // });

    // return carCategory ? [carCategory] : [];
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export const editCategory = async (id, category) => {
  try {
    const response = await axiosInstance.post(
      `/category/update/?id=${id}`,
      category
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/category/delete/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


//Feature Apis

export const getVehicleFeature = async () => {
  try {
    const response = await axiosInstance.get("/vehicle/feature/get/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVehicleFeature = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/vehicle/feature/delete/?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const editVehicleFeature = async (id, vehicleName) => {
  try {
    const response = await axiosInstance.post(
      `/vehicle/feature/update/?id=${id}`,
      vehicleName
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addVehicleFeature = async (vehicleFeature) => {
  try {
    const response = await axiosInstance.post(
      "/vehicle/feature/add/",
      vehicleFeature
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// Vehicles Apis


export const getVehicles = async (type = "car") => {
  try {
    const response = await axiosInstance.get("/vehicle/get/");
    return response.data.vehicles.filter(vehicle => vehicle.TYPE === type);
  } catch (error) {
    console.error(error);
  }
};
export const getVehicleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/vehicle/get?id=${id}&check=true`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addVehicle = async (vehicleData) => {
  try {
    const response = await axiosInstance.post("/vehicle/add/", vehicleData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editVehicle = async (id, vehicleData) => {
  try {
    const response = await axiosInstance.post(`/vehicle/update/?id=${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await axiosInstance.delete(`/vehicle/delete/?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Vehicle Attributes Apis

export const getVehicleAttributes = async () => {
  try {
    const response = await axiosInstance.get("/vehicle/attribute/get");
    return response.data;
  } catch (error) {
    throw(error);
  }
}

export const deleteVehicleAttribute = async (id) => {
  try {
    const response = await axiosInstance.delete(`/vehicle/attribute/delete?id=${id}`);
    return response.data;
  } catch (error) {
    throw(error);
  }
}

export const addVehicleAttribute = async (newAttribute) => {
  try {
    const response = await axiosInstance.post("/vehicle/attribute/add/", newAttribute);
    return response.data;
  } catch (error) {
    throw(error)
  }
}

export const editVehicleAttribute = async (id, vehicleAttribute) => {
  try {
    const response = await axiosInstance.put(
      `/vehicle/attribute/update/?id=${id}`,
      vehicleAttribute
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



//Total Count Apis 

export const getTotalVehicles = async (type = "car") => {
  try {
    const response = await axiosInstance.get("/vehicle/get/");
    return response.data.pagination.totalVehicles;
  } catch (error) {
    console.error(error);
  }
};


export const getTotalAuctionVerification = async (type = "car") => {
  try {
    const response = await axiosInstance.get("/vehicle/get/");
    return response.data.filters.AUCTION_SHEET.true;
  } catch (error) {
    console.error(error);
  }
};