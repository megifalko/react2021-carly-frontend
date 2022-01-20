import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../../styles/navbar.css";
import {RiArrowDropDownFill, RiUserLine} from "react-icons/ri";
import BookingsFilter from "./BookingsFilter";
import BookingsSort from "./BookingsSort";
import useLogin from "../../../modules/useLogin";

const NavigationBar = () => {

    const {logOut} = useLogin();
    const navigate = useNavigate();
    const [filtersDropped, setFiltersDropped] = useState(false);
    const [sortDropped, setSortDropped] = useState(false);

    const closeFilters = () => {
        setFiltersDropped(false);
    }

    const closeSort = () => {
        setSortDropped(false);
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
                            <BookingsFilter close={closeFilters}/>
                        </div>
                    </div>

                    <div className={"dropdown"}>
                        <button
                            className={"drop-button " + (sortDropped ? "drop-button-dropped" : "")}
                            onClick={() => {setSortDropped(!sortDropped)}}>
                            Sort <RiArrowDropDownFill className={"icon"} />
                        </button>
                        <div className={"dropdown-content " + (sortDropped ? "dropdown-content-dropped" : "")}>
                            <BookingsSort close={closeSort}/>
                        </div>
                    </div>
                </div>
                <input />
                <div className={"align-right"}>
                    <div className="align-right">
                        <button onClick={() => navigate("/cars")}>
                            Cars
                        </button>
                    </div>
                </div>

            </div>
            <div className="align-right">
                <RiUserLine className="icon" onClick={() => logOut()}/>
            </div>
        </>
    );
};

export default NavigationBar;