import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthState, login, logout } from "../store/AuthSlice";
import logo from "../resources/logo_login.bmp"
import "../styles/login.css"

const Login = () => {
  const isLoggedIn = useSelector((state: {auth: AuthState}) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    isLoggedIn ? dispatch(logout()) : dispatch(login());
    navigate("../bookings");
  };

  return (
    <>
        <form className={"login-container"}>
            <img src={logo} className={"logo"}/>

            <input placeholder={"username"}/>
            <input placeholder={"password"} type={"password"}/>

            <button
                onClick={onClick}
                className={"login-button"}>
                Log in
            </button>
        </form>

    </>
  );
};

export default Login;
