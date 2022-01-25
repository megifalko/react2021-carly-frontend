import React, {useEffect, useState} from "react";
import {Car} from "../../objects/Car";
import useLogin from "../../modules/useLogin";
import {getImagesIds, imageUri} from "../../logic/api";

interface CarListItemProps {
    car: Car;
    onShowDetails: Function
}

const CarListItem: React.FC<CarListItemProps> = (props: CarListItemProps) => {

    const {authToken} = useLogin();
    const [imagesIds, setImagesIds] = useState<string[]>([]);

    useEffect(() => {
        updateImagesIds()
    }, [props.car]);

    const updateImagesIds = () => {
        getImagesIds(props.car.id, authToken).then(data => {
            setImagesIds(data);
        }).catch((e) => {
            console.error("Error during updating the imagesIds \n" +
                JSON.stringify(e));
        })
    }

    const carImage = imagesIds.length > 0 ? imageUri(imagesIds[0]) : "yaris.png";

    return (
        <div className="car-list-item">
            <p className="brand-header">{props.car.brand}</p>
            <p className="model-header">{props.car.model}</p>
            <img src={carImage} alt="car image"/>
            <button
                onClick={(_) => props.onShowDetails(props.car)}>
                Details
            </button>
        </div>
    );
};

export default CarListItem;
