import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../styles/navbar.css";
import {RiArrowDropDownFill, RiSearchLine, RiUserLine} from "react-icons/ri";
import BookingsSort from "./BookingsSort";
import useGet from "../../../modules/useGet";
import useLogin from "../../../modules/useLogin";

const NavigationBar = () => {

    const query = new URLSearchParams(useLocation().search);
    const {updateParam, refreshPath} = useGet("bookings");
    const {logOut} = useLogin();
    const navigate = useNavigate();
    const [sortDropped, setSortDropped] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState(query.has("search") ? query.get("search") : "");

    const search = () => {
        updateParam("search", searchPhrase ?? "", query);
        refreshPath(navigate, query);
    }

    const submitSort = (criterion: string, direction: string) =>
    {
        updateParam("sort", criterion, query);
        updateParam("direction", direction, query);
        refreshPath(navigate, query);
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
                            className={"drop-button " + (sortDropped ? "drop-button-dropped" : "")}
                            onClick={() => {setSortDropped(!sortDropped)}}>
                            Sort <RiArrowDropDownFill className={"icon"} />
                        </button>
                        <div className={"dropdown-content " + (sortDropped ? "dropdown-content-dropped" : "")}>
                            <BookingsSort close={closeSort} submit={submitSort}/>
                        </div>
                    </div>
                </div>
                <input onChange={(e) => {setSearchPhrase(e.target.value)}}/>
                <button onClick={search}>
                    <RiSearchLine className={"icon"} />
                </button>
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