import "./App.css";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";
import AddLocation from "./LocationComponent/AddLocation";
import AddFacility from "./FacilityComponent/AddFacility";
import AddSalonForm from "./SalonComponent/AddSalonForm";
import UserRegister from "./UserComponent/UserRegister";
import Salon from "./SalonComponent/Salon";
import AddSalonFacilities from "./FacilityComponent/AddSalonFacilities";
import AddSalonReview from "./SalonReviewComponent/AddSalonReview";
import UserLoginForm from "./UserComponent/UserLoginForm";
import ViewAllBooking from "./BookingComponent/ViewAllBooking";
import ViewMyBooking from "./BookingComponent/ViewMyBooking";
import ViewMySalonBookings from "./BookingComponent/ViewMySalonBookings";
import VerifyBooking from "./BookingComponent/VerifyBooking";
import ViewAllCustomers from "./UserComponent/ViewAllCustomers";
import MyWallet from "./UserComponent/MyWallet";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/salon/location" element={<HomePage />} />
        <Route
          path="/home/salon/location/:locationId/:locationName"
          element={<HomePage />}
        />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="admin/add-location" element={<AddLocation />} />
        <Route path="admin/add-facility" element={<AddFacility />} />
        <Route path="admin/salon/register" element={<AddSalonForm />} />
        <Route path="user/salon/register" element={<UserRegister />} />
        <Route path="user/customer/register" element={<UserRegister />} />
        <Route path="user/admin/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route
          path="/home/salon/location/:locationId/:locationName"
          element={<HomePage />}
        />
        <Route
          path="salon/:salonId/add/facility"
          element={<AddSalonFacilities />}
        />
        <Route
          path="salon/:salonId/location/:locationId/add/review"
          element={<AddSalonReview />}
        />
        <Route
          path="/salon/:salonId/location/:locationId"
          element={<Salon />}
        />
        <Route path="user/admin/booking/all" element={<ViewAllBooking />} />
        <Route path="user/salon/bookings" element={<ViewMyBooking />} />
        <Route
          path="user/salon/bookings/all"
          element={<ViewMySalonBookings />}
        />
        <Route
          path="/salon/verify/booking/:bookingId"
          element={<VerifyBooking />}
        />
        <Route path="/customer/view" element={<ViewAllCustomers />} />
        <Route path="/salon/earnings/view" element={<MyWallet />} />
      </Routes>
    </div>
  );
}

export default App;
