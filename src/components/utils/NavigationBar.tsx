import React from "react";
import { useNavigate } from "react-router-dom";
import { RiHome2Line, RiUserLine } from "react-icons/ri";

const NavigationBar = () => {

    const navigate = useNavigate();

  return (
    <>
      <nav className="nav">
        <div className="align-left">
          <RiHome2Line className="icon" onClick={() => navigate("cars")}/>
        </div>
        Navigation
        <div className="align-right">
          <RiUserLine className="icon" onClick={() => navigate("login")}/>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
