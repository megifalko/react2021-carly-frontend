import React, {ChangeEvent, useEffect, useState} from 'react'
import {Car} from "../../objects/Car";
import 'react-upload-gallery/dist/style.css'
import '../../styles/CarEditor.css'
import { getImagesIds, imageUri } from '../../logic/api';
import useLogin from '../../modules/useLogin';

interface CarEditorProps {
    cancelHandler: Function
    saveHandler: (car: Car, uploadedImages: File[], imgsToDelete: string[]) => void
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

    const galleryItem = (image: string, id: Number, removeHandler: Function) => {
        return <div key={image}>
            <img src={image} className='img-preview'/>
            <button onClick={() => removeHandler(id)}>X</button>
        </div>
    }

    const {authToken} = useLogin();
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [initialImageIds, setInitialImageIds] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<File[]>([])

    useEffect(() => {
        if(car == emptyCar) return;
        getImagesIds(car.id, authToken).then(data => {
            setImageIds(data);
            setInitialImageIds(data);
        }).catch((e) => {
            console.error("Error during updating the imageIds \n" +
                JSON.stringify(e));
        })
    }, []);

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

            <div>
                {uploadedImages.map((img, id) => galleryItem(
                    URL.createObjectURL(img), id, (id: Number) => 
                        setUploadedImages(uploadedImages.filter((img, imgId) => imgId != id))))}
                {imageIds.map((img, id) => galleryItem(imageUri(img), id, ((id: Number) => 
                        setImageIds(imageIds.filter((img, imgId) => imgId != id)))))}
                
                <input accept="image/*" type="file" onChange={(event) => {
                    if(event.target.files) setUploadedImages([...uploadedImages, event.target.files[0]]);
                }}/>
            </div>

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
                onClick={(_) => saveHandler(editedCar, uploadedImages, initialImageIds.filter(img => !imageIds.includes(img)))}>
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
