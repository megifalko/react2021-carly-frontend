import React, {useEffect} from "react";
import CarListItem from "../components/car/CarListItem";
import {useDispatch, useSelector} from "react-redux";
import {CarsState, updateCars} from "../store/CarsSlice";
import { Outlet } from 'react-router-dom'
import {AuthState} from "../store/AuthSlice";

/*
const defaultCar: Car = {
    id: "fasd",
    price: 123,
    brand: "Toyota",
    model: "Yaris",
    location: "Tralala",
    year: 2021,
    engine: "strong"
}
 */

const CarList = () => {
    const cars = useSelector((state: {cars: CarsState}) => state.cars.cars )
    const securityToken = useSelector((state: {auth: AuthState}) => state.auth.securityToken);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateCars(securityToken))
    }, []);

    return (
        <>
            <h1>Car list</h1>
            <button>New Car</button>
            {cars.map((car) => {
                    return (
                        <CarListItem car={car}/>
                    )
                }
            )}
            <Outlet/>
        </>
    );
};

export default CarList;
