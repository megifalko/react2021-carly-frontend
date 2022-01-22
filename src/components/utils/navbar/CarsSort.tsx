import React, {Component} from "react";
import "../../../styles/navbar.css";
import {RiCloseLine} from "react-icons/ri";

interface CarsSortProps {
    close: Function;
    submit: Function;
}

interface CarFilter {
    name: string,
    visibleName: string,
    ascending: string,
    descending: string,
}

const CarsSort = (props: CarsSortProps) => {


    const filters: CarFilter[] = [
        {name: "date", visibleName: "Data dodania", ascending: "od najmłodszych", descending: "od najstarszych"},
        {name: "price", visibleName: "Cena", ascending: "od najtańszych", descending: "od najdroższych"},
    ]

    const options: JSX.Element[] = [];
    filters.forEach((val) => {
        options.push(
            <button
                id={"1" + val.name}
                onClick={() => {
                    props.submit(val.name, "asc")
                }}>
                {val.visibleName}: {val.ascending}
            </button>)
        options.push(
            <button
                id={"2" + val.name}
                onClick={() => {
                    props.submit(val.name, "desc")
                }}>
                {val.visibleName}: {val.descending}
            </button>)
    });

    return (
        <div>
            <button onClick={() => {
                props.close()
            }}>
                <RiCloseLine className="icon"/>
            </button>
            {options}
        </div>
    );
};

export default CarsSort;

