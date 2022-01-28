import React, {useState} from "react";
import "../../../styles/navbar.css";
import {RiCloseLine} from "react-icons/ri";
import {useLocation} from "react-router-dom";

interface CarsFilterProps {
    close: Function;
    submit: Function;
}

const CarsFilter = (props : CarsFilterProps) => {
    const [model, setModel] = useState("");
    const [location, setLocation] = useState("");
    const submitForm = () => {
        props.submit(model, location);
        props.close();
    }
    return (
        <form className="flex-col flex-ac-center flex-a-start p-20 w-200">
            <button onClick={() => {props.close()}} type={'button'} className="bg-transparent btn-close">
                <RiCloseLine className="icon" />
            </button>
            <b>Filter by...</b>
            <p>Pickup location</p>
            <input onChange={(e) => {setLocation(e.target.value)}} className="input-border"/>
            <p>Model</p>
            <input onChange={(e) => {setModel(e.target.value)}} className="input-border"/>
            <button type={"button"} onClick={submitForm} className="text-white border-radius-30 w-100 h-30 s-14 m-10 bg-c2 as-center font-weight-700">
                Apply
            </button>
        </form>
    );
};

export default CarsFilter;
