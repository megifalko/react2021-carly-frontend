import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../styles/navbar.css";
import {RiArrowDropDownFill, RiSearchLine, RiUserLine} from "react-icons/ri";
import BookingsSort from "./BookingsSort";
import useGet from "../../../modules/useGet";
import useLogin from "../../../modules/useLogin";
import Dropdown from "../Dropdown";
import {IoIosArrowForward} from 'react-icons/io'

const NavigationBar = () => {

    const query = new URLSearchParams(useLocation().search);
    const {updateParam, refreshPath} = useGet("bookings");
    const {logOut} = useLogin();
    const navigate = useNavigate();
    const [searchPhrase, setSearchPhrase] = useState(query.has("search") ? query.get("search") : "");

    const search = () => {
        updateParam("search", searchPhrase ?? "", query);
        refreshPath(navigate, query);
    }

    const submitSort = (criterion: string, direction: string) => {
        updateParam(criterion + "_sort", direction, query);
        refreshPath(navigate, query);
    }

    return (
        <>
            <div className="nav-content">
                <div className="flex-row pl-90">
                    <Dropdown
                        content={(close: Function) => {
                            return <BookingsSort close={close} submit={submitSort}/>
                        }}
                        name={"Sort"}/>
                </div>
                <input onChange={(e) => {
                    setSearchPhrase(e.target.value)
                }}/>
                <button className="s-20 text-center bg-transparent flex-row flex-ac-center color-white" onClick={search}>
                    <RiSearchLine className={"icon"}/>
                </button>
                <button
          className="text-white text-center bg-transparent w-110 flex-row flex-j-center flex-a-center s-16 p-10"
          onClick={() => navigate("/cars")}>
          Cars  <IoIosArrowForward className="icon"/>
        </button>
            </div>
            <div className="a-right">
                <RiUserLine className="icon" onClick={() => logOut()}/>
            </div>
        </>
    );
};

export default NavigationBar;