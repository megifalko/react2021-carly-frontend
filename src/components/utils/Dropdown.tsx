import React, {useState} from "react";
import "../../styles/navbar.css";
import {RiArrowDropDownFill} from "react-icons/ri";
import CarsFilter from "./navbar/CarsFilter";

interface NewCarPlaceholderProps {
    submit: Function;
    name: string;
}

const Dropdown = (props : NewCarPlaceholderProps) => {
    const [dropped, setDropped] = useState(false);
    return (
        <div className={"dropdown"}>
            <button
                className={"drop-button " + (dropped ? "drop-button-dropped" : "")}
                onClick={() => {setDropped(!dropped)}}>
                <p className={"button-content"}>{props.name}</p>
                <RiArrowDropDownFill className={"icon button-content"} />
            </button>
            <div className={"dropdown-arrow dropdown-arrow-tl"}>
                <div className={" dropdown-content " + (dropped ? "dropdown-content-dropped" : "")}>
                    <CarsFilter close={() => setDropped(false)} submit={props.submit}/>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;