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
        {name: "date", visibleName: "Date", ascending: "Newest to oldest", descending: "Oldest to newest"},
        {name: "price", visibleName: "Price", ascending: "Ascending", descending: "Descending"},
    ]

    const options: JSX.Element[] = [];
    filters.forEach((val) => {
        options.push(
            <button className="text-white border-radius-30 w-180 h-50 s-14 m-10 bg-c2 as-center font-weight-700"
                id={"1" + val.name}
                onClick={() => {
                    props.close();
                    props.submit(val.name, "asc");
                }}>
                {val.visibleName}: {val.ascending}
            </button>)
        options.push(
            <button className="text-white border-radius-30 w-180 h-50 s-14 m-10 bg-c2 as-center font-weight-700"
                id={"2" + val.name}
                onClick={() => {
                    props.close();
                    props.submit(val.name, "desc")
                }}>
                {val.visibleName}: {val.descending}
            </button>)
    });

    return (
        <div className="flex-col flex-ac-center flex-a-start p-20 w-200 pt-20">
            <button className="bg-transparent btn-close" onClick={() => {
                props.close()
            }}>
                <RiCloseLine className="icon"/>
            </button>
            {options}
        </div>
    );
};

export default CarsSort;

