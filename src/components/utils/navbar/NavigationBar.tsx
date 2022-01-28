import React from "react";
import "../../../styles/navbar.css";
import { RiUserLine } from "react-icons/ri";
import NavigationBarContentCars from "./NavigationBarContentCars";
import NavigationBarContentEmpty from "./NavigationBarContentEmpty";
import NavigationBarContentBookings from "./NavigationBarContentBookings";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const curr = window.location.pathname;
  let content;
  const navigate = useNavigate();
  switch (curr) {
    case "/cars":
      content = <NavigationBarContentCars />;
      break;
    case "/bookings":
      content = <NavigationBarContentBookings />;
      break;
    default:
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
