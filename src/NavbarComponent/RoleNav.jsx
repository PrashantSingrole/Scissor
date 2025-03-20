import AdminHeader from "./AdminHeader";
import CustomerHeader from "./CustomerHeader";
import SalonHeader from "./SalonHeader";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const salon = JSON.parse(sessionStorage.getItem("active-salon"));

  if (user != null) {
    return <CustomerHeader />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (salon != null) {
    return <SalonHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
