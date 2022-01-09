import React from "react";
import "../../../styles/navbar.css";
import {RiCloseLine} from "react-icons/ri";

interface BookingsFilterProps {
    close: Function
}

const BookingsFilter = (props : BookingsFilterProps) => {
    return (
        <div>
            <button onClick={() => {props.close()}}>
                <RiCloseLine className="icon" />
            </button>
            <b>Filter by...</b>
            <p>Pickup location</p>
            <input />
            <p>Model</p>
            <input />
            <button>
                Apply
            </button>
        </div>
    );
};

export default BookingsFilter;
