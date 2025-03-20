import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SalonCarousel from "../SalonComponent/SalonCarousel";
import { useParams } from "react-router-dom";
import axios from "axios";
import SalonCard from "../SalonComponent/SalonCard";

const AddSalonReview = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [userId, setUserId] = useState(user.id);

  let { salonId, locationId } = useParams();

  const [star, setStar] = useState("");
  const [review, setReview] = useState("");

  const [salons, setSalons] = useState([]);

  const [salon, setSalon] = useState({
    id: "",
    name: "",
    description: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    totalRoom: "",
    image1: "",
    image2: "",
    image3: "",
    userId: "",
    location: { id: "", city: "", description: "" },
    facility: [{ id: "", name: "", description: "" }],
  });

  let navigate = useNavigate();

  const retrieveSalon = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/salon/id?salonId=" + salonId
    );

    return response.data;
  };

  useEffect(() => {
    const getSalon = async () => {
      const retrievedSalon = await retrieveSalon();

      setSalon(retrievedSalon.salon);
    };

    const getSalonsByLocation = async () => {
      const allSalons = await retrieveSalonsByLocation();
      if (allSalons) {
        setSalons(allSalons.salons);
      }
    };

    getSalon();
    getSalonsByLocation();
  }, [salonId]);

  const retrieveSalonsByLocation = async () => {
    console.log("Lets print location id here " + salon.location.id);

    const response = await axios.get(
      "http://localhost:8080/api/salon/location?locationId=" + locationId
    );
    console.log(response.data);
    return response.data;
  };

  const saveSalonReview = (e) => {
    if (user == null) {
      e.preventDefault();
      alert("Please login as Customer for adding your review!!!");
    } else {
      e.preventDefault();
      setUserId(user.id);
      let data = { userId, salonId, star, review };

      fetch("http://localhost:8080/api/salon/review/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((res) => {
          console.log(res);
          navigate("/salon/" + salon.id + "/location/" + salon.location.id);
          console.log(res.responseMessage);
          toast.warn(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      });
    }
  };

  return (
    <div className="container-fluid mb-5">
      <div class="row">
        <div class="col-sm-2 mt-2"></div>
        <div class="col-sm-3 mt-2">
          <div class="card form-card border-color custom-bg">
            <SalonCarousel
              item={{
                image1: salon.image1,
                image2: salon.image2,
                image3: salon.image3,
              }}
            />
          </div>
        </div>

        <div class="col-sm-5 mt-2">
          <div
            className="card form-card border-color custom-bg"
            style={{ width: "30rem" }}
          >
            <div className="card-header bg-color text-center custom-bg-text">
              <h5 className="card-title">Add Salon Review</h5>
            </div>
            <div className="card-body text-color">
              <form onSubmit={saveSalonReview}>
                <div className="mb-3">
                  <label className="form-label">
                    <b>Star</b>
                  </label>

                  <select
                    name="locationId"
                    onChange={(e) => {
                      setStar(e.target.value);
                    }}
                    className="form-control"
                  >
                    <option value="">Select Star</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="review" className="form-label">
                    <b>Salon Review</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="review"
                    rows="3"
                    placeholder="enter review.."
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                    value={review}
                  />
                </div>

                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Add Review"
                />

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-sm-12">
          <h2>Other Salons in {salon.location.city} Location:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {salons.map((h) => {
              return <SalonCard item={h} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalonReview;
