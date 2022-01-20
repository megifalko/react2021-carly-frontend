import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../../styles/navbar.css";
import {RiArrowDropDownFill, RiUserLine} from "react-icons/ri";
import CarsFilter from "./CarsFilter";
import CarsSort from "./CarsSort";
import NewCarPlaceholder from "./NewCarPlaceholder";
import useLogin from "../../../modules/useLogin";

const NavigationBar = () => {

    const navigate = useNavigate();
    const {logOut} = useLogin();
    const [filtersDropped, setFiltersDropped] = useState(false);
    const [sortDropped, setSortDropped] = useState(false);
    const [newCarVisible, setNewCarVisible] = useState(false);

    const closeFilters = () => {
        setFiltersDropped(false);
    }

    const closeSort = () => {
        setSortDropped(false);
    }

    const closeNewCar = () => {
        setNewCarVisible(false);
    }
    return (
        <>
            <div className="nav-content">
                <div className="align-left">
                    <div className={"dropdown"}>
                        <button
                            className={"drop-button " + (filtersDropped ? "drop-button-dropped" : "")}
                            onClick={() => {setFiltersDropped(!filtersDropped)}}>
                            <p className={"button-content"}>Filter</p>
                            <RiArrowDropDownFill className={"icon button-content"} />
                        </button>
                        <div className={"dropdown-content " + (filtersDropped ? "dropdown-content-dropped" : "")}>
                            <CarsFilter close={closeFilters}/>
                        </div>
                    </div>

                    <div className={"dropdown"}>
                        <button
                            className={"drop-button " + (sortDropped ? "drop-button-dropped" : "")}
                            onClick={() => {setSortDropped(!sortDropped)}}>
                            Sort <RiArrowDropDownFill className={"icon"} />
                        </button>
                        <div className={"dropdown-content " + (sortDropped ? "dropdown-content-dropped" : "")}>
                            <CarsSort close={closeSort}/>
                        </div>
                    </div>
                </div>
                <input />
                <div className={"align-right"}>
                    <button onClick={() => {setNewCarVisible(!newCarVisible)}}>
                        New Car
                    </button>
                    <div className="align-right">
                        <button onClick={() => navigate("bookings")}>
                            Bookings
                        </button>
                    </div>
                </div>

            </div>
            <div className={"popup-content " + (newCarVisible ? "popup-content-shown" : "")}>
                <NewCarPlaceholder close={closeNewCar} />
            </div>
            <div className="align-right">

                <RiUserLine className="icon" onClick={() => logOut()}/>
            </div>
        </>
    );
};

export default NavigationBar;