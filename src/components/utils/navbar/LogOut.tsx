import React, {useState} from "react";
import "../../../styles/navbar.css";
import useLogin from "../../../modules/useLogin";
import {useNavigate} from "react-router-dom";

const LogOut = () => {
    const {logOut} = useLogin();
    const navigate = useNavigate();
    return (
        <div className="flex-col w-220 h-150 flex-j-center">
            <button
                className="text-white border-radius-30 w-180 h-50 s-14 m-10 bg-c2 as-center font-weight-700"
                onClick={() => {
                    logOut();
                    navigate('/login');
                }}>
                Log out
            </button>
        </div>
    );
};
export default LogOut;