import React, {useEffect, useState} from "react";
import "../../../styles/navbar.css";
import NavigationBarContentCars from "./NavigationBarContentCars";
import NavigationBarContentEmpty from "./NavigationBarContentEmpty";
import NavigationBarContentBookings from "./NavigationBarContentBookings";
import useLogin from "../../../modules/useLogin";
import {Route, Routes} from "react-router-dom";
import Layout from "../../../pages/Layout";
import CarList from "../../../pages/CarList";
import BookingList from "../../../pages/BookingList";
import Login from "../../../pages/Login";
import NotFound from "../../../pages/NotFound";
import {PrivateRoute} from "../../../App";

const NavigationBar = () => {
    const [curr, setCurr] = useState('/');
    useEffect(() => {
        setCurr(window.location.pathname);
    }, [window])
    let content;
    const {isLoggedIn} = useLogin();
    switch (curr) {
        case "/cars":
            content = <NavigationBarContentCars/>;
            break;
        case "/bookings":
            content = <NavigationBarContentBookings/>;
            break;
        default:
            if (isLoggedIn())
                content = <NavigationBarContentCars/>;
            else
                content = <NavigationBarContentEmpty/>;
            break;
    }
    return (
        <>
            <nav className="nav">
                <p className="a-left">Carly Admin</p>
                <Routes>
                    <Route index element={<NavigationBarContentEmpty/>}/>
                    <Route path="cars" element={<NavigationBarContentCars/>}/>
                    <Route path="bookings" element={<NavigationBarContentBookings/>}/>
                    <Route path="login" element={<NavigationBarContentEmpty/>}/>
                    <Route path="*" element={<NavigationBarContentEmpty/>}/>
                </Routes>
            </nav>
        </>
    )
};

export default NavigationBar;


