import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
//import Razorpay from "razorpay";

const MyWallet = () => {
  let navigate = useNavigate();
  const salon = JSON.parse(sessionStorage.getItem("active-salon"));
  const salon_jwtToken = sessionStorage.getItem("salon-jwtToken");
  const [walletAmount, setWalletAmount] = useState(0.0);

  useEffect(() => {
    const getUser = async () => {
      const userResponse = await retrieveMyWallet();
      if (userResponse) {
        setWalletAmount(userResponse.user.walletAmount);
      }
    };

    getUser();
  }, []);

  const retrieveMyWallet = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/id?userId=" + salon.id
    );

    return response.data;
  };

  return (
    <div>
      <div className="mt-2 mb-5 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card custom-bg mb-5"
          style={{ width: "25rem" }}
        >
          <div
            className="card-header bg-color text-center custom-bg-text mb-3"
            style={{
              borderRadius: "1em",
              height: "50px",
            }}
          >
            <h3>Earnings</h3>
          </div>
          <h4 className="ms-3 text-color text-center mb-5">
            Wallet Balance: &#8377; {walletAmount}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
