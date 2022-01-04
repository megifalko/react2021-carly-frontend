import React from 'react'
import {Car} from "../../objects/Car";

interface CarDetailsProps {
    car: Car
}

const CarDetails : React.FC<CarDetailsProps> = (props) => {

    return (

        <div>
            <p>Brand</p>
            <h1>{props.car.brand}</h1>

            <p>Model</p>
            <h2>{props.car.model}</h2>

            <p>Year</p>
            <h3>{props.car.year}</h3>

            <p>Engine</p>
            <h3>{props.car.engine}</h3>

            <p>Location</p>
            <h3>{props.car.location}</h3>

            <p>Price</p>
            <h2>{props.car.price}</h2>
            <span>/day</span>

            <button>Delete</button>
            <button>Edit</button>
        </div>
    )
}

export default CarDetails
