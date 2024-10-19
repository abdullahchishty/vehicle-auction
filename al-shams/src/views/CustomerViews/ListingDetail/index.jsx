import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  AboutListing,
  Bidding,
  BreadCrum,
  ImageGallery,
  ListingDetailInfo,
  ListingFeatures,
  ListingOverview,
  ProtectedRoute,
  RelatedListings,
} from "../../../components";
import "./listingDetail.scss";
import { SuperBalls } from "@uiball/loaders";
import { axiosInstance } from "../../../core/api";
import toast from "react-hot-toast";

const ListingDetail = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [overviewDetails, setOverviewDetails] = useState([]);
  const isMounted = useRef(false);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [dimensionsCapacity, setDimensionsCapacity] = useState(null);
  const [engineTransmission, setEngineTransmission] = useState(null);
  const [error, setError] = useState(false);
  const { type, id } = useParams();

  overviewDetails = overviewDetails.filter((obj) => obj && obj.value !== "__");

  dimensionsCapacity &&
    Object.keys(dimensionsCapacity).forEach((key) => {
      if (dimensionsCapacity[key] === "__") {
        delete dimensionsCapacity[key];
      }
    });

  engineTransmission &&
    Object.keys(engineTransmission).forEach((key) => {
      if (engineTransmission[key] === "__") {
        delete engineTransmission[key];
      }
    });

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          type === "auction" ? "/vehicle/auction/get" : "/vehicle/get",
          {
            params: type === "auction" ? { ID: id } : { id },
          }
        );
        let vehicle = response.data.vehicles[0];

        if (type === "auction") vehicle = preprocessImages(vehicle);

        setVehicleDetails(vehicle);

        if (type !== "auction") {
          setOverviewDetails([
            {
              name: "Country",
              value: vehicle.COUNTRY|| "__",
              class: "chasis",
            },
            {
              name: "Body",
              value: vehicle.CATEGORY?.name || "__",
              class: "body",
            },
            {
              name: "Mileage",
              value: vehicle.MILEAGE ? `${vehicle.MILEAGE} km` : "__",
              class: "mileage",
            },
            {
              name: "Year",
              value:
                (type === "auction" ? vehicle.YEAR : vehicle.REGISTER_YEAR) ||
                "__",
              class: "year",
            },
            {
              name: "Transmission",
              value: vehicle.TRANSMISSION || "__",
              class: "transmission",
            },
            {
              name: "Condition",
              value: vehicle.CONDITION || "__",
              class: "condition",
            },
            {
              name: "Fuel Type",
              value: vehicle.FUEL_TYPE || "__",
              class: "engine",
            },
            {
              name: "Engine Number",
              value: vehicle.ENGINE_NUMBER || "__",
              class: "engine",
            },
            {
              name: "Color",
              value: vehicle.COLOR || "__",
              class: "color",
            },
            {
              name: "Chasis Number",
              value: vehicle.CHASSIS_NUMBER || "__",
              class: "chasis",
            },
          ]);
        } else {
          setOverviewDetails([
            {
              name: "LOT#",
              value: vehicle.LOT || "-",
              class: "chasis",
            },
            {
              name: "Auction Type",
              value: vehicle.AUCTION_TYPE || "-",
              class: "chasis",
            },
            {
              name: "Auction Date/Time",
              value: vehicle.AUCTION_DATE || "-",
              class: "chasis",
            },
            {
              name: "Auction Location",
              value: vehicle.AUCTION || "-",
              class: "chasis",
            },
            {
              name: "Marka Id",
              value: vehicle.MARKA_ID || "-",
              class: "chasis",
            },
            {
              name: "Model Id",
              value: vehicle.MODEL_ID || "-",
              class: "chasis",
            },
            {
              name: "Marka Name",
              value: vehicle.MARKA_NAME || "-",
              class: "chasis",
            },
            {
              name: "Model Name",
              value: vehicle.MODEL_NAME || "-",
              class: "chasis",
            },
            {
              name: "Year",
              value: vehicle.YEAR || "-",
              class: "chasis",
            },
            {
              name: "Town",
              value: vehicle.TOWN || "-",
              class: "chasis",
            },
            {
              name: "Engine Volume",
              value: vehicle.ENG_V || "-",
              class: "chasis",
            },
            {
              name: "Power Output",
              value: vehicle.PW || "-",
              class: "chasis",
            },
            {
              name: "Kuzov",
              value: vehicle.KUZOV || "-",
              class: "chasis",
            },
            {
              name: "Grade",
              value: vehicle.GRADE || "-",
              class: "chasis",
            },
            {
              name: "Color",
              value: vehicle.COLOR || "-",
              class: "chasis",
            },
            {
              name: "Transmission",
              value: vehicle.KPP || "-",
              class: "chasis",
            },
            {
              name: "Transmission Type",
              value: vehicle.KPP_TYPE || "-",
              class: "chasis",
            },
            {
              name: "Priv",
              value: vehicle.PRIV || "-",
              class: "chasis",
            },
            {
              name: "Mileage",
              value: vehicle.MILEAGE || "-",
              class: "chasis",
            },
            {
              name: "Equip",
              value: vehicle.EQUIP || "-",
              class: "chasis",
            },
            {
              name: "Rating",
              value: vehicle.RATE || "-",
              class: "chasis",
            },
            {
              name: "Bid Start",
              value: vehicle.START || "-",
              class: "chasis",
            },
            {
              name: "Bid Finish",
              value: vehicle.START || "-",
              class: "chasis",
            },
            {
              name: "Status",
              value: vehicle.STATUS || "-",
              class: "chasis",
            },
            {
              name: "Time",
              value: vehicle.TIME || "-",
              class: "chasis",
            },
            {
              name: "Average Price",
              value: vehicle.AVG_PRICE || "-",
              class: "chasis",
            },
            {
              name: "Average String",
              value: vehicle.AVG_STRING || "-",
              class: "chasis",
            },
          ]);
        }

        setDimensionsCapacity({
          Length: vehicle.LENGTH || "__",
          Width: vehicle.WIDTH || "__",
          Height: vehicle.HEIGHT || "__",
          "Width (including mirrors)": vehicle.WIDTH_INCLUDING_MIRROR || "__",
          Wheelbase: vehicle.WHEEL_BASE || "__",
          "Gross Vehicle Weight (kg)": vehicle.GROSS_WEIGHT || "__",
          // "Height (including roof rails)": vehicle.HEIGH_INCLUDING_ROOF_RAILS || "__",
          "Max. Loading Weight (kg)": vehicle.MAX_LOADING_WEIGHT || "__",
          "Luggage Capacity": vehicle.LUGGAGE_CAPACITY || "__",
          // "Luggage Capacity (Seats Up - Litres)": vehicle.LUGGAGE_CAPACITY_SEATES_UP || "__",
          // "Max. Roof Load (kg)": vehicle.MAX_ROOF_LOAD || "__",
          // "Luggage Capacity (Seats Down - Litres)": vehicle.LUGGAGE_CAPACITY_SEATS_DOWN || "__",
          "No. of Seats": vehicle.NO_OF_SEATS || "__",
        });

        setEngineTransmission({
          "Fuel Tank Capacity (Litres)": vehicle.FUEL_TANK_CAPACITY || "__",
          "Minimum Kerbweight (kg)": vehicle.MINIMUM_KERB_WEIGHT || "__",
          "Max. Towing Weight - Braked (kg)":
            vehicle.MAX_TOWING_WEIGHT_BRAKED || "__",
          "Turning Circle - Kerb to Kerb(m)": vehicle.TURNING_CIRCLE || "__",
          "Max. Towing Weight - Unbraked (kg)":
            vehicle.MAX_TOWING_WEIGHT_UNBRAKED || "__",
        });
      } catch (error) {
        toast.error("Something went wrong");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();

    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    const fromPage = sessionStorage.getItem("fromPage");
    sessionStorage.removeItem("fromPage");
    let breadcrumbItems;

    if (fromPage === "/listings") {
      breadcrumbItems = [
        { text: "Home", href: "/" },
        { text: "Listings", href: "/listings" },
        { text: "Listing Detail", href: location.pathname },
      ];
    } else {
      breadcrumbItems = [
        { text: "Home", href: "/" },
        { text: "Listing Detail", href: location.pathname },
      ];
    }

    setBreadcrumbs(breadcrumbItems);
  }, [location.pathname]);

  if (!isLoading && !error) {
    return (
      <ProtectedRoute
        For={type === "auction" ? "customer" : undefined}
        element={
          <div className="listing-detail">
            <div className="listing-detail__container">
              <BreadCrum items={breadcrumbs} />
              <div className="listing-detail__container__content">
                <div className="listing-detail__container__content__details">
                  <h1 className="listing-detail__container__content__details__heading">
                    {(vehicleDetails.MARKA_NAME || "__") +
                      " " +
                      (vehicleDetails.MODEL_NAME || "__")}
                  </h1>

                  <ImageGallery
                    listingsType={type}
                    images={vehicleDetails.IMAGES}
                  />
                  <Bidding
                    vehicleName={
                      (vehicleDetails.MARKA_NAME || "__") +
                      " " +
                      (vehicleDetails.MODEL_NAME || "__")
                    }
                    price={
                      type === "auction"
                        ? vehicleDetails.START
                        : vehicleDetails.PRICE
                    }
                  />
                  <div className="listing-detail__container__content__details__divider"></div>
                  {overviewDetails.length !== 0 && (
                    <>
                      <ListingOverview overviewDetails={overviewDetails} />
                    </>
                  )}
                  {vehicleDetails?.DESCRIPTION && (
                    <>
                      <AboutListing description={vehicleDetails.DESCRIPTION} />
                      <div className="listing-detail__container__content__details__divider"></div>
                    </>
                  )}
                  {vehicleDetails?.FEATURES &&
                    vehicleDetails.FEATURES.length !== 0 && (
                      <>
                        <ListingFeatures FEATURES={vehicleDetails.FEATURES} />
                        <div className="listing-detail__container__content__details__divider"></div>
                      </>
                    )}

                  {dimensionsCapacity &&
                    Object.keys(dimensionsCapacity).length !== 0 && (
                      <>
                        <ListingDetailInfo
                          listingDetailInfo={dimensionsCapacity}
                          heading={"Dimensions & Capacity"}
                        />
                      </>
                    )}

                  {engineTransmission &&
                    Object.keys(engineTransmission).length !== 0 && (
                      <>
                        <ListingDetailInfo
                          listingDetailInfo={engineTransmission}
                          heading={"Engine and Transmission"}
                        />
                      </>
                    )}
                </div>

                <div className="listing-detail__container__content__bidding">
                  <Bidding
                    vehicleName={
                      (vehicleDetails.MARKA_NAME || "__") +
                      " " +
                      (vehicleDetails.MODEL_NAME || "__")
                    }
                    price={
                      type === "auction"
                        ? vehicleDetails.START
                        : vehicleDetails.PRICE
                    }
                  />
                </div>
              </div>
              <RelatedListings
                MARKA_NAME={vehicleDetails?.MARKA_NAME}
                MODEL_NAME={vehicleDetails?.MODEL_NAME}
              />
            </div>
          </div>
        }
      />
    );
  } else if (error) {
    return (
      <ProtectedRoute
        For={type === "auction" ? "customer" : undefined}
        element={<div className="listing-detail__error"></div>}
      />
    );
  }

  return (
    <ProtectedRoute
      For={type === "auction" ? "customer" : undefined}
      element={
        <div className="loading-container">
          <SuperBalls color={"#00b67a"} size={45} speed={0.9} />
        </div>
      }
    />
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

export default ListingDetail;
