import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthState, login, logout } from "../store/AuthSlice";

const Login = () => {
  const isLoggedIn = useSelector((state: {auth: AuthState}) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    isLoggedIn ? dispatch(logout()) : dispatch(login());
    navigate("../cars");
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={onClick}>{isLoggedIn ? "Log out" : "Log in"}</button>
    </>
  );
};

export default Login;
