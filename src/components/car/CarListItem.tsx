import React from "react";
import {Car} from "../../objects/Car";

interface CarListItemProps {
    car: Car;
    onShowDetails: Function
}

const CarListItem: React.FC<CarListItemProps> = (props: CarListItemProps) => {

    return (
        <div>
            <p>{props.car.brand}</p>
            <p>{props.car.model}</p>
            <img alt={""}/>
            <button
                onClick={(_) => props.onShowDetails(props.car)}>
                Details
            </button>
        </div>
    );
};

export default CarListItem;
