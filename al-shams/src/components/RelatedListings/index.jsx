import React, { useState, useEffect } from "react";
import "./relatedListings.scss";
import images from "../../assets/images";
import ProductCard from "../ProductCard";
import { SuperBalls } from "@uiball/loaders";
import { axiosInstance } from "../../core/api";
import { useParams } from "react-router-dom";

const RelatedListings = ({ MARKA_NAME, MODEL_NAME }) => {
  // state
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type } = useParams();

  // useEffect
  useEffect(() => {
    (async () => {
      try {
        const response =
          type !== "auction"
            ? await axiosInstance.get("/vehicle/get", {
                params: { search: MARKA_NAME, limit: 4 },
              })
            : await axiosInstance.get("/vehicle/auction/get", {
                params: { search: MARKA_NAME, limit: 4 },
              });
        setProductList(response.data.vehicles);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // loading component
  if (loading) {
    return (
      <div className="listings-component__loading">
        <SuperBalls color={"#00b67a"} size={45} speed={0.9} />
      </div>
    );
  }

  return (
    <div className="related-listings">
      <h2 className="related-listings__heading">Related Vehicles</h2>
      <div className="related-listings__container">
        {productList.map((product, index) => {
          if (type === "auction") product = preprocessImages(product);
          return (
            <ProductCard
              listingsType={type}
              id={type === "auction" ? product.ID : product._id}
              key={index}
              make={product.MARKA_NAME}
              model={product.MODEL_NAME}
              description={product.DESCRIPTION}
              location={type === "auction" ? product.TOWN : product.LOCATION}
              milage={product.MILEAGE}
              fuel_type={product.FUEL_TYPE}
              transmission={
                type === "auction" ? product.KPP : product.TRANSMISSION
              }
              year={type === "auction" ? product.YEAR : product.REGISTER_YEAR}
              starting={type === "auction" ? "Average Price" : product.STARTING}
              price={type === "auction" ? product.AVG_PRICE : product.PRICE}
              image={product.IMAGES?.[0]}
              alt={product.ALT}
              link={
                type === "auction"
                  ? `/listings/auction/${product.ID}`
                  : `/listings/inventory/${product._id}`
              }
            />
          );
        })}
      </div>
    </div>
  );
};

function preprocessImages(product) {
  const newProduct = { ...product };
  const images = newProduct.IMAGES.split("#");
  const preprocessedImages = images.map((image) =>
    image.replace(new RegExp("&h=\\d+|&w=\\d+", "g"), "")
  );
  newProduct.IMAGES = preprocessedImages;
  return newProduct;
}

export default RelatedListings;
