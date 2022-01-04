import React from "react";
import {Car} from "../../objects/Car";
import {useNavigate} from "react-router-dom";

interface CarListItemProps {
    car: Car;
}

const CarListItem: React.FC<CarListItemProps> = (props: CarListItemProps) => {

    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/${props.car.id}`)
    }

    return (
        <div>
            <p>{props.car.brand}</p>
            <p>{props.car.model}</p>
            <img alt={""}/>
            <button onClick={onClick}>Details</button>
        </div>
    );
};

export default CarListItem;
