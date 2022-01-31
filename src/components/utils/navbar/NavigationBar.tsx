import React from "react";
import "../../../styles/navbar.css";
import { RiUserLine } from "react-icons/ri";
import NavigationBarContentCars from "./NavigationBarContentCars";
import NavigationBarContentEmpty from "./NavigationBarContentEmpty";
import NavigationBarContentBookings from "./NavigationBarContentBookings";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../modules/useLogin";

const NavigationBar = () => {
  const curr = window.location.pathname;
  let content;
  const {isLoggedIn} = useLogin();
  switch (curr) {
    case "/cars":
      content = <NavigationBarContentCars />;
      break;
    case "/bookings":
      content = <NavigationBarContentBookings />;
      break;
    default:
      if(isLoggedIn())
        content = <NavigationBarContentCars />;
      else
        content = <NavigationBarContentEmpty />;
      break;
  }
  return (
    <>
      <nav className="nav">
        <p className="a-left">Carly Admin</p>
        {content}
      </nav>
    </>
  );
};

export default NavigationBar;
