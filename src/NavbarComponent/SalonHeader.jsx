import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalonHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-salon"));
  console.log(user);

  const salonLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-salon");
    window.location.reload(true);
    navigate("home");
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="user/salon/bookings/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">All Bookings</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/salon/earnings/view"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Earnings</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={salonLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default SalonHeader;
