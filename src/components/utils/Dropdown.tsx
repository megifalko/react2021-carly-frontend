import React, {useState} from "react";
import "../../styles/navbar.css";
import {RiArrowDropDownFill} from "react-icons/ri";
import CarsFilter from "./navbar/CarsFilter";

interface NewCarPlaceholderProps {
    content: Function;
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
            <div className={""}>
                <div className={" dropdown-content " + (dropped ? "dropdown-content-dropped" : "")}>
                    {props.content(() => setDropped(false))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;