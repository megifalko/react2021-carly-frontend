import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/logo_login.bmp";
import "../styles/login.css";
import useLogin from "../modules/useLogin";
import useAuthorization from "../modules/useAuthorization";
import {MdDirectionsCar} from 'react-icons/md'
import Loader from "../components/utils/Loader";

const Login = () => {
  const { logIn } = useLogin();
  const navigate = useNavigate();
  const auth = useAuthorization();

  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const onClick = async () => {
    let res;
    setLoading(true);
    try {
      res = await auth(loginValue, passwordValue);
    } catch {
      setShowError(true);
      setLoading(false);
      return;
    }

    if (res.jwttoken === "") setShowError(true);
    else {
      logIn(res.jwttoken);
      navigate("../cars");
    }
    setLoading(false);
  };

  const errMess = showError ? <p>error</p> : <></>;
  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <form
          className={"flex-col flex-a-center flex-j-center m-0 full-height"}
        >
          <MdDirectionsCar className="w-80 h-80"/>
          <h2 className="bold mb-10">Carly</h2>
          <div className="flex-col flex-a-center flex-j-center">
            <input
              className="w-300 h-50 border-radius-75 m-10 s-14"
              placeholder={"username"}
              onChange={(e) => {
                setLoginValue(e.target.value);
              }}
            />
            <input
              className="w-300 h-50 border-radius-75 m-10 s-14"
              placeholder={"password"}
              type={"password"}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />
            {errMess}
            <button
              onClick={onClick}
              className="bg-c2 w-340 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mt-50"
              type={"button"}
            >
              Log in
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
