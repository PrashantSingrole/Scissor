import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SalonCard from "./SalonCard";
import SalonCarousel from "./SalonCarousel";
import GetSalonFacilities from "../FacilityComponent/GetSalonFacilities";
import GetSalonReviews from "../SalonReviewComponent/GetSalonReviews";
import { useNavigate } from "react-router-dom";
import Footer from "../page/Footer";

const Salon = () => {
  const { salonId, locationId } = useParams();

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  let admin = JSON.parse(sessionStorage.getItem("active-salon"));

  const [salons, setSalons] = useState([]);

  let navigate = useNavigate();

  const [facilitiesToPass, setFacilitiesToPass] = useState([]);

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

  const [booking, setBooking] = useState({
    userId: "",
    salonId: salonId,
    date: "",
    timeSlot: "",
  });

  const handleBookingInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

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

    console.log("Print salon");
    console.log(salon.json);

    setFacilitiesToPass(salon.facility);
  }, [salonId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script from the DOM when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  const retrieveSalonsByLocation = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/salon/location?locationId=" + locationId
    );
    console.log(response.data);
    return response.data;
  };

  const bookSalon = (e) => {
    e.preventDefault();

    if (user === null) {
      alert("Please log in to book the salon slot!!!!");
      return;
    }

    booking.userId = user.id;

    fetch("http://localhost:8080/api/book/salon/validate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.responseCode === 0) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            fetch("http://localhost:8080/api/payment/order/create", {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(res.booking),
            })
              .then((result) => {
                result.json().then((res) => {
                  if (res.responseCode === 0) {
                    console.log("Success Response");
                    var options = res.razorPayRequest;
                    console.log(options);

                    // Add the handler function to the responseData object
                    options.handler = function (response) {
                      console.log("printing razorpay response body");
                      console.log(JSON.stringify(response));
                      console.log(response.razorpay_payment_id);
                      console.log(response.razorpay_order_id);
                      console.log(response.razorpay_signature);
                      response.razorpay_order_id = options.orderId;
                      response.booking = res.booking; // making proper request
                      fetch(
                        "http://localhost:8080/api/payment/razorpPay/response",
                        {
                          method: "PUT",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(response),
                        }
                      )
                        .then((result) => {
                          result.json().then((res) => {
                            if (res.responseCode === 0) {
                              toast.success(res.responseMessage, {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });

                              setTimeout(() => {
                                navigate("/user/salon/bookings");
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
                        })
                        .catch((error) => {
                          console.error(error);
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
                        });
                    };
                    console.log("final json after adding handler function");
                    console.log(options);

                    // Check if Razorpay is available in the window object
                    if (window.Razorpay) {
                      console.log("Rzaorpay is defined");
                      const rzp1 = new window.Razorpay(options);
                      rzp1.on("payment.failed", function (response) {
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);

                        response.razorpay_order_id = options.orderId;
                        console.log("printing razorpay failed response body");
                        console.log(JSON.stringify(response));

                        fetch(
                          "http://localhost:8080/api/payment/razorpPay/response",
                          {
                            method: "PUT",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(response),
                          }
                        )
                          .then((result) => {
                            result.json().then((res) => {
                              if (res.responseCode === 0) {
                                toast.success(res.responseMessage, {
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
                                // }, 1000);
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
                          })
                          .catch((error) => {
                            console.error(error);
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
                          });
                      });
                      rzp1.open();
                    } else {
                      toast.error("Payment Gateway Internal Server Issue", {
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
                  }
                });
              })
              .catch((error) => {
                console.error(error);
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
              });
          } else if (res.responseCode === 1) {
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
      })
      .catch((error) => {
        console.error(error);
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
      });
  };

  const navigateToAddSalonFacility = () => {
    navigate("/salon/" + salonId + "/add/facility");
  };

  const navigateToAddReviewPage = () => {
    navigate("/salon/" + salonId + "/location/" + locationId + "/add/review");
  };

  return (
    <div className="container-fluid mb-5">
      <div class="row">
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
          <div class="card form-card border-color custom-bg">
            <div class="card-header bg-color">
              <div className="d-flex justify-content-between">
                <h1 className="custom-bg-text">{salon.name}</h1>
              </div>
            </div>

            <div class="card-body text-left text-color">
              <div class="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <p class="card-text">{salon.description}</p>
            </div>

            <div class="card-footer custom-bg">
              <div className="d-flex justify-content-between">
                <p>
                  <span>
                    <h4>Price Per Service: &#8377;{salon.pricePerDay}/-</h4>
                  </span>
                </p>
              </div>

              <div>
                <form class="row g-3" onSubmit={bookSalon}>
                  <div class="col-auto">
                    <label for="checkin">Booking Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="date"
                      name="date"
                      onChange={handleBookingInput}
                      value={booking.date}
                      required
                    />
                  </div>
                  <div class="col-auto">
                    <label htmlFor="description">Appointment Time</label>
                    <select
                      name="timeSlot"
                      onChange={handleBookingInput}
                      className="form-control"
                    >
                      <option value="">Select Appointment Time</option>
                      <option value="09:00 - 10:00 am">09:00 - 10:00 am</option>
                      <option value="10:00 - 11:00 am">10:00 - 11:00 am</option>
                      <option value="11:00 - 12:00 am">11:00 - 12:00 am</option>
                      <option value="12:00 - 01:00 pm">12:00 - 01:00 pm</option>
                      <option value="01:00 - 02:00 pm">01:00 - 02:00 pm</option>
                      <option value="02:00 - 03:00 pm">02:00 - 03:00 pm</option>
                      <option value="03:00 - 04:00 pm">03:00 - 04:00 pm</option>
                      <option value="04:00 - 05:00 pm">04:00 - 05:00 pm</option>
                      <option value="05:00 - 06:00 pm">05:00 - 06:00 pm</option>
                      <option value="06:00 - 07:00 pm">06:00 - 07:00 pm</option>
                      <option value="07:00 - 08:00 pm">07:00 - 08:00 pm</option>
                      <option value="08:00 - 09:00 pm">08:00 - 09:00 pm</option>
                      <option value="09:00 - 10:00 pm">09:00 - 10:00 pm</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div>
                      <input
                        type="submit"
                        class="btn custom-bg bg-color mb-3"
                        value="Book Salon"
                      />
                    </div>
                    <ToastContainer />
                  </div>
                </form>
              </div>

              {(() => {
                if (admin) {
                  console.log(admin);
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn custom-bg bg-color mb-3"
                        value="Add Facilities"
                        onClick={navigateToAddSalonFacility}
                      />
                    </div>
                  );
                }
              })()}

              {(() => {
                if (user) {
                  console.log(user);
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn custom-bg bg-color mb-3"
                        value="Add Review"
                        onClick={navigateToAddReviewPage}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
        <div class="col-sm-2 mt-2">
          <GetSalonFacilities item={salon} />
        </div>

        <div class="col-sm-2 mt-2">
          <GetSalonReviews item={salon} />
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
      <br />
      <hr />
      <Footer />
    </div>
  );
};

export default Salon;
