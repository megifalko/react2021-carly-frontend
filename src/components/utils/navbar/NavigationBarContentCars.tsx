import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../styles/navbar.css";
import {RiArrowDropDownFill, RiSearchLine, RiUserLine} from "react-icons/ri";
import CarsSort from "./CarsSort";
import NewCarPlaceholder from "./NewCarPlaceholder";
import useGet from "../../../modules/useGet";
import useLogin from "../../../modules/useLogin";
import Dropdown from "../Dropdown";
import CarsFilter from "./CarsFilter";

const NavigationBar = () => {

    const query = new URLSearchParams(useLocation().search);

    const navigate = useNavigate();
    const {updateParam, refreshPath} = useGet("cars");
    const {logOut} = useLogin();
    const [newCarVisible, setNewCarVisible] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState(query.has("search") ? query.get("search") : "");

    const submitFilters = (model: string, location: string) => {
        updateParam("model", model, query);
        updateParam("location", location, query);
        refreshPath(navigate, query);
    }

    const search = () => {
        updateParam("search_text", searchPhrase ?? "", query);
        refreshPath(navigate, query);
    }

    const submitSort = (criterion: string, direction: string) => {
        updateParam(criterion + "_sort", direction, query);
        refreshPath(navigate, query);
    }

    const closeNewCar = () => {
        setNewCarVisible(false);
    }
    return (
        <>
            <div className="nav-content">
                <div className={"align-left"}>
                    <Dropdown
                        content={(close: Function) => {
                            return <CarsFilter close={close} submit={submitFilters}/>
                        }}
                        name={"Filter"}/>
                    <Dropdown
                        content={(close: Function) => {
                            return <CarsSort close={close} submit={submitSort}/>
                        }}
                        name={"Sort"}/>
                </div>
                <input onChange={(e) => {
                    setSearchPhrase(e.target.value)
                }}/>
                <button onClick={search}>
                    <RiSearchLine className={"icon"}/>
                </button>
                <button onClick={() => {
                    setNewCarVisible(!newCarVisible)
                }}>
                    New Car
                </button>
                <button onClick={() => navigate("bookings")}>
                    Bookings
                </button>
                <div className={"popup-content " + (newCarVisible ? "popup-content-shown" : "")}>
                    <NewCarPlaceholder close={closeNewCar}/>
                </div>
                <div className="align-right">

                    <RiUserLine className="icon" onClick={() => logOut()}/>
                </div>
            </div>
        </>
    );
};

export default NavigationBar;