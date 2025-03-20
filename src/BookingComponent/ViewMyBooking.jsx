import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewMyBooking = () => {
  const [allBookings, setAllBookings] = useState([]);

  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking.bookings);
      }
    };

    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/salon/fetch?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>My Bookings</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Salon</th>
                  <th scope="col">Salon Name</th>
                  <th scope="col">Salon Email</th>
                  {/* <th scope="col">Salon Contact</th> */}
                  <th scope="col">Booking Id</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time Slot</th>

                  <th scope="col">Booking Status</th>
                  <th scope="col">Total Payable Amount</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/salon/" +
                            booking.salonImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>

                      <td>
                        <b>{booking.salonName}</b>
                      </td>
                      <td>
                        <b>{booking.salonEmail}</b>
                      </td>
                      {/* <td>
                        <b>{booking.salonContact}</b>
                      </td> */}

                      <td>
                        <b>{booking.bookingId}</b>
                      </td>
                      <td>
                        <b>{booking.customerName}</b>
                      </td>
                      <td>
                        <b>{booking.customerContact}</b>
                      </td>

                      <td>
                        <b>{booking.date}</b>
                      </td>
                      <td>
                        <b>{booking.timeSlot}</b>
                      </td>

                      <td>
                        <b>{booking.status}</b>
                      </td>
                      <td>
                        <b>{booking.totalAmount}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyBooking;
