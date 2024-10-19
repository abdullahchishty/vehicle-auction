import React, { useEffect, useState } from "react";
import {
  FilterSearch,
  ListingsComponent,
  ListingsHeroSection,
  MultiLayerFilterComponent,
  ProtectedRoute,
} from "../../../components";
import "./listings.scss";
import { useLocation, useParams } from "react-router-dom";
import { axiosInstance } from "../../../core/api";

const Listing = () => {
  // state
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersCount, setFiltersCount] = useState(null);
  const [totalItems, setTotalItems] = useState(0);  
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const location = useLocation();
  const { type } = useParams();

  useEffect(() => {

    setLoading(true);
    const params = new URLSearchParams(location.search);

    // fetching data from url
    const filterBrand = params.get("brand");
    const filterTransmission = params.get("transmission");
    const filterCondition = params.get("condition");
    const filterAuctionSheet = params.get("auctionSheet");
    const filterPriceFrom = params.get("priceRange_from");
    const filterPriceTo = params.get("priceRange_to");
    const filterSearch = params.get("search");
    const filterYear = params.get("year");
    const filterCategory = params.get("category");
    const sortParam = params.get("sort");
    const currentPage = parseInt(params.get("page")) || 1;

    (async () => {
      try {
        // sending request to server
        const response = await axiosInstance.get(type === "auction" ? "/vehicle/auction/get" : "/vehicle/get", {
          params: {
            MARKA_NAME: filterBrand || undefined,
            TRANSMISSION: filterTransmission || undefined,
            CONDITION: filterCondition || undefined,
            AUCTION_SHEET: filterAuctionSheet || undefined,
            search: filterSearch || undefined,
            minPrice: (Number(filterPriceFrom)) ? filterPriceFrom : undefined,
            maxPrice: (Number(filterPriceTo)) ? filterPriceTo : undefined,
            YEAR: filterYear || undefined,
            CATEGORY: filterCategory || undefined,
            sort: sortParam || undefined,
            page: currentPage,
            limit: 21
          }
        });
        // setting the state 
        setProductList(response.data.vehicles);
        setTotalItems(response.data.pagination.totalVehicles);
        setItemsPerPage(response.data.pagination.itemsPerPage);
        setFiltersCount(response.data.filters)

      } catch (error) {

      } finally {
        setLoading(false);
      }
    }
    )();
  }, [location.search]);

  return (
    <ProtectedRoute For={type === "auction" ? "customer" : undefined} element={(
      <div className="listings">
        <ListingsHeroSection />
        <FilterSearch isLoading={loading} />
        <div className="listings__container">
          <div className="listings__container__multifilter">
            <MultiLayerFilterComponent filtersCount={filtersCount} isLoading={loading} />
          </div>
          <ListingsComponent productList={productList} isLoading={loading} totalItems={totalItems} itemsPerPage={itemsPerPage} />
        </div>
      </div>
    )}/>
  );
};
export default Listing;