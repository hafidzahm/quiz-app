import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  return (
    <div className="font-montserrat">
      <Navbar />
      <Outlet />
    </div>
  );
}
