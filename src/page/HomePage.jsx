import Carousel from "./Carousel";
import GetAllLocations from "../LocationComponent/GetAllLocations";
import GetAllFacility from "../FacilityComponent/GetAllFacility";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SalonCard from "../SalonComponent/SalonCard";
import Footer from "./Footer";

const HomePage = () => {
  const [salons, setSalons] = useState([]);
  const { locationId } = useParams();

  useEffect(() => {
    const getAllSalons = async () => {
      const allSalons = await retrieveAllSalons();
      if (allSalons) {
        setSalons(allSalons.salons);
      }
    };

    const getProductsByLocation = async () => {
      const allSalons = await retrieveProductsByLocation();
      if (allSalons) {
        setSalons(allSalons.salons);
      }
    };

    if (locationId == null) {
      console.log("Location Id is null");
      getAllSalons();
    } else {
      console.log("Location Id is NOT null");
      getProductsByLocation();
    }
  }, [locationId]);

  const retrieveAllSalons = async () => {
    const response = await axios.get("http://localhost:8080/api/salon/fetch");

    return response.data;
  };

  const retrieveProductsByLocation = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/salon/location?locationId=" + locationId
    );

    return response.data;
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <div className="mt-2 mb-5">
        <div className="row">
          <div className="col-md-2">
            <GetAllLocations />
          </div>
          <div className="col-md-8">
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {salons.map((salon) => {
                return <SalonCard item={salon} />;
              })}
            </div>
          </div>
          <div className="col-md-2">
            <GetAllFacility />
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
