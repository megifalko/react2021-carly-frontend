import React, {useEffect, useState} from 'react'
import {Car} from "../../objects/Car";
import {getImagesIds, imageUri} from "../../logic/api";
import {useSelector} from "react-redux";
import {AuthState} from "../../store/AuthSlice";

interface CarDetailsProps {
    car: Car
    editHandler: Function
    deleteHandler: Function
}

const CarDetails : React.FC<CarDetailsProps> = (props) => {
    const securityToken = useSelector((state: { auth: AuthState }) => state.auth.securityToken);
    const [imagesIds, setImagesIds] = useState<string[]>([]);

    useEffect(() => {
        updateImagesIds()
    }, []);

    const updateImagesIds = () => {
        getImagesIds(props.car.id, securityToken).then(data => {
            setImagesIds(data);
        }).catch((e) => {
            console.error("Error during updating the imagesIds \n" +
                JSON.stringify(e));
        })
    }

    return (
        <div>

            <p>Brand</p>
            <h1>{props.car.brand}</h1>

            <p>Model</p>
            <h2>{props.car.model}</h2>

            <img src={imageUri(imagesIds[0])} alt={`${props.car.brand} ${props.car.model}`}/>

            <p>Year</p>
            <h3>{props.car.year}</h3>

            <p>Engine</p>
            <h3>{props.car.engine}</h3>

            <p>Location</p>
            <h3>{props.car.location}</h3>

            <p>Price</p>
            <h2>{props.car.price}</h2>
            <span>/day</span>

            <button
                onClick={(_) => props.deleteHandler}>
                Delete
            </button>
            <button
                onClick={(_) => props.editHandler}>
                Edit
            </button>
        </div>
    )
}

export default CarDetails
