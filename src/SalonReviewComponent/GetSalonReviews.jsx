import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import star from "../images/star.png";

const GetSalonReviews = (salon) => {
  const [reviews, setReviews] = useState([]);

  const { salonId } = useParams();

  console.log(
    "Printing salon Id fetch in Get Salon Reviews : " + salon.item.id
  );

  const retrieveAllReviews = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/salon/review/fetch?salonId=" + salonId
    );
    return response.data;
  };

  useEffect(() => {
    const getAllReviews = async () => {
      const allReviews = await retrieveAllReviews();
      if (allReviews) {
        setReviews(allReviews.salonReviews);
      }
    };

    getAllReviews();
  }, []);

  return (
    <div
      class="list-group form-card border-color"
      style={{
        height: "25rem",
      }}
    >
      <div class="list-group-item list-group-item-action bg-color custom-bg-text">
        <b>Reviews</b>
      </div>
      <div
        style={{
          overflowY: "auto",
        }}
      >
        {reviews.map((review) => {
          return (
            <div class="list-group-item list-group-item-action text-color custom-bg">
              <b className="text-color1">{review.user + " "}</b>
              <b className="text-color">{review.star + " /5 "}</b>
              <img
                src={star}
                width="20"
                height="20"
                className="d-inline-block align-top"
                alt=""
              />
              <br />
              <p>{review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetSalonReviews;
