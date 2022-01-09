import React from "react";
import "../../../styles/navbar.css";
import {RiCloseLine} from "react-icons/ri";

interface NewCarPlaceholderProps {
    close: Function
}

const CarsFilter = (props : NewCarPlaceholderProps) => {
    return (
        <div>
            <button onClick={() => {props.close()}}>
                <RiCloseLine className="icon" />
            </button>
            New Car
        </div>
    );
};

export default CarsFilter;
