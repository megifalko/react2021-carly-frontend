import React, {ChangeEvent, ChangeEventHandler, useState} from 'react'
import {Car} from "../../objects/Car";
import {FileUploader} from "react-drag-drop-files";

interface CarEditorProps {
    cancelHandler: Function
    saveHandler: (car: Car, file: File | null) => void
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

    const [file, setFile] = useState<File | null>(null);
    const handleChange = (file: File) => {
        setFile(file);
    }
    const fileTypes = ["JPG", "PNG", "GIF"];

    const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files)
        {
            setFile(event.target.files[0]);
        }
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

            <FileUploader handleChange={handleChange} name="file" types={fileTypes}/>
            <input type="file" onChange={fileSelectedHandler}/>

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
                onClick={(_) => saveHandler(editedCar, file)}>
                Save
            </button>
            <button
                onClick={(_) => cancelHandler()}>
                Cancel
            </button>
        </div>
    )
}

export default CarEditor
