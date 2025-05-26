import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

export default function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    guardLogin();
  }, []);
  function guardLogin() {
    const GET_USER = localStorage.getItem("LOGIN:USER");
    if (!GET_USER) {
      navigate("/login", {
        state: [{ message: "Login first before get started" }],
      });
    }
  }
  return (
    <div className="font-montserrat">
      <Navbar />
      <Outlet />
    </div>
  );
}
