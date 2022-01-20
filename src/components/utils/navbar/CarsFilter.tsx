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
        <form>
            <button onClick={() => {props.close()}} type={'button'}>
                <RiCloseLine className="icon" />
            </button>
            <b>Filter by...</b>
            <p>Pickup location</p>
            <input onChange={(e) => {setLocation(e.target.value)}}/>
            <p>Model</p>
            <input onChange={(e) => {setModel(e.target.value)}}/>
            <button type={"button"} onClick={submitForm}>
                Apply
            </button>
        </form>
    );
};

export default CarsFilter;
