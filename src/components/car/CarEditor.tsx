import React, {useState} from 'react'
import {Car} from "../../objects/Car";

interface CarEditorProps {
    car: Car
}

const CarEditor: React.FC<CarEditorProps> = (props) => {
    const [editedCar, setEditedCar] = useState(props.car)

    const updateBrand = (brand: string) => {
        setEditedCar({...editedCar, brand: brand})
    }

    const updateModel = (model: string) => {
        setEditedCar({...editedCar, model: model})
    }

    const updateYear = (year: number) => {
        setEditedCar({...editedCar, year: year})
    }

    const updateEngine = (engine: string) => {
        setEditedCar({...editedCar, engine: engine})
    }

    const updateLocation = (location: string) => {
        setEditedCar({...editedCar, location: location})
    }

    const updatePrice = (price: number) => {
        setEditedCar({...editedCar, price: price})
    }

    return (
        <div>
            <p>Brand</p>
            <input
                defaultValue={props.car.brand}
                onChange={(e) => updateBrand(e.target.value)}/>

            <p>Model</p>
            <input
                defaultValue={props.car.model}
                onChange={(e) => updateModel(e.target.value)}/>

            <p>Year</p>
            <input
                type={"number"}
                defaultValue={props.car.year}
                onChange={(e) => updateYear(Number(e.target.value))}/>

            <p>Engine</p>
            <input
                defaultValue={props.car.engine}
                onChange={(e) => updateEngine(e.target.value)}/>

            <p>Location</p>
            <input
                defaultValue={props.car.location}
                onChange={(e) => updateLocation(e.target.value)}/>

            <p>Price</p>
            <input
                defaultValue={props.car.price}
                onChange={(e) => updatePrice(Number(e.target.value))}/>
            <span>/day</span>

            <button>Save</button>
            <button>Cancel</button>
        </div>
    )
}

export default CarEditor
