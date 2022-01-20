import React from "react";
import "../../../styles/navbar.css";
import {RiCloseLine} from "react-icons/ri";

interface BookingsSortProps {
    close: Function;
    submit: Function;
}
interface BookingsFilter {
    name: string
    visibleName: string
    ascending: string
    descending: string
}
const BookingsSort = (props : BookingsSortProps) => {

    const filters: BookingsFilter[] = [
        {name: "date", visibleName: "Data dodania", ascending: "od najmłodszych", descending: "od najstarszych"},
        {name: "price", visibleName: "Cena", ascending: "od najtańszych", descending: "od najdroższych"},
    ]

    const options: JSX.Element[] = [];
    filters.forEach((val) => {
        options.push(
            <button
                id={"1" + val.name}
                onClick={() => {
                    props.submit(val.name, "ascending");
                    props.close();
                }}>
                {val.visibleName}: {val.ascending}
            </button>)
        options.push(
            <button
                id={"2" + val.name}
                onClick={() => {
                    props.submit(val.name, "descending");
                    props.close();
                }}>
                {val.visibleName}: {val.descending}
            </button>)
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

