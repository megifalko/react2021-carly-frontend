import React, { useState } from "react";
import "../../styles/navbar.css";
import { IoIosArrowDown } from "react-icons/io";
import CarsFilter from "./navbar/CarsFilter";

interface NewCarPlaceholderProps {
  content: Function;
  name: any;
  className?: string;
}

const Dropdown = (props: NewCarPlaceholderProps) => {
  const [dropped, setDropped] = useState(false);
  return (
    <div
        className={"dropdown "}
        onMouseLeave={() => setDropped(false)}
        onMouseEnter={() => setDropped(true)}>

      <button
        className={
          "text-white text-center bg-transparent w-80 flex-row flex-j-center s-16 flex-row flex-a-center p-10 drop-button " +
          (dropped ? "drop-button-dropped" : "")
        }
        onClick={() => {
          setDropped(!dropped);
        }}
      >
        {props.name}  <IoIosArrowDown className={"icon"} />
      </button>
      <div className={props.className}>
        <div
          className={
            " border-radius-30 dropdown-content " +
            (dropped ? "dropdown-content-dropped" : "")
          }
        >
          {props.content(() => setDropped(false))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
