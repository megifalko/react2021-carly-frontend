import React, {useState} from 'react'
import {Car} from "../../objects/Car";

interface CarEditorProps {
    cancelHandler: Function
    saveHandler: (car: Car) => void
    car?: Car
}

const emptyCar: Car = {id: "", price: 1, brand: "", model: "", location: "", year: 2022, engine: ""};

const CarEditor: React.FC<CarEditorProps> = ({car = emptyCar, cancelHandler, saveHandler}) => {

    const [editedCar, setEditedCar] = useState(car)

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
                defaultValue={car.brand}
                placeholder="Brand"
                onChange={(e) => updateBrand(e.target.value)}/>

            <p>Model</p>
            <input
                defaultValue={car.model}
                placeholder="Model"
                onChange={(e) => updateModel(e.target.value)}/>

            <p>Year</p>
            <input
                type={"number"}
                defaultValue={car.year}
                placeholder="2022"
                onChange={(e) => updateYear(Number(e.target.value))}/>

            <p>Engine</p>
            <input
                defaultValue={car.engine}
                placeholder="Engine"
                onChange={(e) => updateEngine(e.target.value)}/>

            <p>Location</p>
            <input
                defaultValue={car.location}
                placeholder="Location"
                onChange={(e) => updateLocation(e.target.value)}/>

            <p>Price</p>
            <input
                defaultValue={car.price}
                onChange={(e) => updatePrice(Number(e.target.value))}/>
            <span>/day</span>

            <button
                onClick={(_) => saveHandler(editedCar)}>
                Save
            </button>
            <button
                onClick={(_) => cancelHandler}>
                Cancel
            </button>
        </div>
    )
}

export default CarEditor
