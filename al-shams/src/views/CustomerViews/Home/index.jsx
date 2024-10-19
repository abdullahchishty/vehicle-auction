import React, { useEffect, useState } from "react";
import "./home.scss";
import { SuperBalls } from "@uiball/loaders";
import {
  AnimatedPage,
  ChooseUs,
  ExploreListings,
  FilterExploreLisitings,
  FilterSearch,
  HeroSection,
  VehicleCategories,
  VerifyAuctionSheet,
} from "../../../components";
import { axiosInstance } from "../../../core/api";
import { getVehicleCategories } from "../../../services/vehicleApis";

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

const Home = () => {
  const [data, setData] = useState(null);
  const [vehicleCategoriesList, setVehicleCategoriesList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/vehicle/get"); 
        const categories = (await axiosInstance.get("/category/get/")).data;
        const extractedData = categories.reduce((acc, item) => {
          return acc.concat(flattenCategories(item));
        }, []);
        setVehicleCategoriesList(extractedData)
        setData(response.data.vehicles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <SuperBalls color={"#00b67a"} size={45} speed={0.9} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AnimatedPage>
      <div className="home">
        <HeroSection />
        <div className="home__container">
          <FilterSearch />
          <VehicleCategories vehicleCategoriesList={vehicleCategoriesList}/>
          <ExploreListings title="Explore Our Latest Auction Listings" ProductList={data.slice(0, 4)}/>
          <ChooseUs />
          <FilterExploreLisitings ProductList={data.slice(0, 10)}/>
          {/* <ExploreListings
            title="Our Latest Auction Machinery" 
            ProductList={data.slice(0, 4)}
            buttonLink={"/listings/inventory"}
            buttonText={"View All Machinery"}
          /> */}
          <VerifyAuctionSheet />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Home;
