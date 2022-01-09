import React from "react";
import "../../../styles/navbar.css";
import {RiCloseLine} from "react-icons/ri";

interface BookingsSortProps {
    close: Function
}

const BookingsSort = (props : BookingsSortProps) => {

    const filters = new Map<string, string[]>([
        ["Data dodania", ["najnowsze", "najstarsze"]],
        ["Cena", ["od najniższej", "od najwyższej"]],
        ["Wiek", ["od najstarszego", "od najnowszego"]]
    ]);
    const options : JSX.Element[] = [];
    filters.forEach((val, key) => {
        val.forEach((val_el)=> {
            options.push(<button id={key + val_el} >{key}: {val_el}</button>)
        })
    });

    return (
        <div>
            <button onClick={() => {props.close()}}>
                <RiCloseLine className="icon" />
            </button>
            {options}
        </div>
    );
};

export default BookingsSort;

