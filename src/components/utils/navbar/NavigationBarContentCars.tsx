import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../styles/navbar.css";
import {RiArrowDropDownFill, RiSearchLine, RiUserLine} from "react-icons/ri";
import CarsSort from "./CarsSort";
import NewCarPlaceholder from "./NewCarPlaceholder";
import useGet from "../../../modules/useGet";
import useLogin from "../../../modules/useLogin";
import Dropdown from "../Dropdown";

const NavigationBar = () => {

    const query = new URLSearchParams(useLocation().search);

    const navigate = useNavigate();
    const {updateParam, refreshPath} = useGet("cars");
    const {logOut} = useLogin();
    const [filtersDropped, setFiltersDropped] = useState(false);
    const [sortDropped, setSortDropped] = useState(false);
    const [newCarVisible, setNewCarVisible] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState(query.has("search") ? query.get("search") : "");

    const submitFilters = (model: string, location: string) =>
    {
        updateParam("model", model, query);
        updateParam("location", location, query);
        refreshPath(navigate, query);
    }

    const search = () => {
        updateParam("search_text", searchPhrase ?? "", query);
        refreshPath(navigate, query);
    }

    const submitSort = (criterion: string, direction: string) =>
    {
        updateParam(criterion + "_sort", direction, query);
        refreshPath(navigate, query);
    }
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
                    {/*<div className={"dropdown"}>*/}
                    {/*    <button*/}
                    {/*        className={"drop-button " + (filtersDropped ? "drop-button-dropped" : "")}*/}
                    {/*        onClick={() => {setFiltersDropped(!filtersDropped)}}>*/}
                    {/*        <p className={"button-content"}>Filter</p>*/}
                    {/*        <RiArrowDropDownFill className={"icon button-content"} />*/}
                    {/*    </button>*/}
                    {/*    <div className={"dropdown-content " + (filtersDropped ? "dropdown-content-dropped" : "")}>*/}
                    {/*        <CarsFilter close={closeFilters} submit={submitFilters}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <Dropdown submit={submitFilters} name={"Filter"} />

                    <div className={"dropdown"}>
                        <button
                            className={"drop-button " + (sortDropped ? "drop-button-dropped" : "")}
                            onClick={() => {setSortDropped(!sortDropped)}}>
                            Sort <RiArrowDropDownFill className={"icon"} />
                        </button>
                        <div className={"dropdown-content " + (sortDropped ? "dropdown-content-dropped" : "")}>
                            <CarsSort submit={submitSort} close={closeSort} />
                        </div>
                    </div>
                </div>
                <input onChange={(e) => {setSearchPhrase(e.target.value)}}/>
                <button onClick={search}>
                    <RiSearchLine className={"icon"} />
                </button>
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