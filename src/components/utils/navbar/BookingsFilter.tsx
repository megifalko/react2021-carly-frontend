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
            <p>Active</p>
            <button>Show active</button>
            <button>Show inactive</button>
            <button>Show all</button>
        </div>
    );

    function onShowActive() {
        // todo
    }
    function onShowInactive() {
        // todo
    }
    function onShowAll() {
        // todo
    }
};
export default BookingsFilter;
