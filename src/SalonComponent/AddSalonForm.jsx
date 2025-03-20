import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddSalonForm = () => {
  const [locations, setLocations] = useState([]);
  const [salonUsers, setSalonUsers] = useState([]);

  let navigate = useNavigate();

  const retrieveAllLocations = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/salon/location/fetch"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const allLocations = await retrieveAllLocations();
      if (allLocations) {
        setLocations(allLocations.locations);
      }
    };

    getAllLocations();
  }, []);

  const retrieveAllSalonUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/user/salon");
    return response.data;
  };

  useEffect(() => {
    const getAllSalonUsers = async () => {
      const allSalonUsers = await retrieveAllSalonUsers();
      if (allSalonUsers) {
        setSalonUsers(allSalonUsers.users);
      }
    };

    getAllSalonUsers();
  }, []);

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [salon, setSalon] = useState({
    name: "",
    description: "",
    locationId: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    userId: "",
  });

  const handleInput = (e) => {
    setSalon({ ...salon, [e.target.name]: e.target.value });
  };

  const saveSalon = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("name", salon.name);
    formData.append("locationId", salon.locationId);
    formData.append("description", salon.description);
    formData.append("street", salon.street);
    formData.append("pincode", salon.pincode);
    formData.append("emailId", salon.emailId);
    formData.append("pricePerDay", salon.pricePerDay);
    formData.append("totalRoom", salon.totalRoom);
    formData.append("userId", salon.userId);

    axios
      .post("http://localhost:8080/api/salon/add", formData)
      .then((response) => {
        let res = response.data;
        if (res.responseCode === 0) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else if (res.responseCode !== 0) {
          toast.error(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 1000); // Redirect after 3 seconds
        } else {
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 1000); // Redirect after 3 seconds
        }
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Salon</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Salon Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={salon.name}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Location</b>
                </label>

                <select
                  name="locationId"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Location</option>

                  {locations.map((location) => {
                    return (
                      <option value={location.id}> {location.city} </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Salon Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={salon.description}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Salon Admin</b>
                </label>
                <select
                  name="userId"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Salon Admin</option>

                  {salonUsers.map((salonUser) => {
                    return (
                      <option value={salonUser.id}>
                        {" "}
                        {salonUser.firstName + " " + salonUser.lastName}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  <b>Salon Email</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleInput}
                  value={salon.emailId}
                />
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  <b>Price Per Service</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pricePerDay"
                  name="pricePerDay"
                  onChange={handleInput}
                  value={salon.pricePerDay}
                />
              </div>

              <div className="col-md-6 mb-3 mt-1">
                <label htmlFor="street" className="form-label">
                  <b>Street</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  onChange={handleInput}
                  value={salon.street}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="pincode" className="form-label">
                  <b>Pin Code</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleInput}
                  value={salon.pincode}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image1" className="form-label">
                  <b> Select Salon Image 1</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="image1"
                  name="image1"
                  value={salon.image1}
                  onChange={(e) => setSelectedImage1(e.target.files[0])}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image2" className="form-label">
                  <b> Select Salon Image 2</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="image2"
                  name="image2"
                  value={salon.image2}
                  onChange={(e) => setSelectedImage2(e.target.files[0])}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image3" className="form-label">
                  <b> Select Salon Image 3</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="image3"
                  name="image3"
                  value={salon.image3}
                  onChange={(e) => setSelectedImage3(e.target.files[0])}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text col-md-4"
                  onClick={saveSalon}
                >
                  Add Salon
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalonForm;
