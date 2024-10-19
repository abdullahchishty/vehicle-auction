import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SortComponent from "../SortComponent";
import ProductCard from "../ProductCard";
import "./listingsComponent.scss";
import Pagination from "../Pagination";
import { SuperBalls } from "@uiball/loaders";
const ListingsComponent = ({ productList, isLoading, totalItems, itemsPerPage }) => {
  const {type} = useParams();
  // loading component
  if (isLoading) {
    return (
      <div className="listings-component__loading">
        <SuperBalls color={"#00B67A"} size={45} speed={0.9} />
      </div>
    );
  }
  // actual component
  return (
    <section className="listings-component">
      <div className="listings-component__container">
        <div className="listings-component__container__header">
          <SortComponent />
        </div>
        <div className="listings-component__container__listings">
          {productList.map((product, index) => {
            if (type === "auction")
              product = preprocessImages(product);
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
                transmission={type === "auction" ? product.KPP : product.TRANSMISSION}
                year={type === "auction" ? product.YEAR : product.REGISTER_YEAR}
                starting={type === "auction" ? "Average Price" : product.STARTING}
                price={type === "auction" ? product.AVG_PRICE : product.PRICE}
                image={product.IMAGES?.[0]}
                alt={product.ALT}
                link={type === "auction" ? `/listings/auction/${product.ID}` : `/listings/inventory/${product._id}`}
              />
            )
          })}
        </div>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </section>
  );
};
function preprocessImages(product) {
  const newProduct = { ... product}
  const images = newProduct.IMAGES.split("#");
  const preprocessedImages = images.map(image => image.replace(new RegExp("&h=\\d+|&w=\\d+", 'g'), ''));
  newProduct.IMAGES = preprocessedImages;
  return newProduct
}
export default ListingsComponent;