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
                className={"flex-col flex-a-center flex-j-center pt-10 drop-button " + (dropped ? "drop-button-dropped" : "")}
                onClick={() => {setDropped(!dropped)}}>
                <p className={"mb-20"}>{props.name}</p>
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