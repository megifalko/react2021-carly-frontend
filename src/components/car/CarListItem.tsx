import React, { useEffect, useState } from "react";
import { Car } from "../../objects/Car";
import useLogin from "../../modules/useLogin";
import { getImagesIds, imageUri } from "../../logic/api";
import Loader from "../utils/Loader";

interface CarListItemProps {
  car: Car;
  onShowDetails: Function;
}

const CarListItem: React.FC<CarListItemProps> = (props: CarListItemProps) => {
  const { authToken } = useLogin();
  const [imagesIds, setImagesIds] = useState<string[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    updateImagesIds();
  }, [props.car]);

  const updateImagesIds = () => {
      setLoadingImage(true)
    getImagesIds(props.car.id, authToken)
      .then((data) => {
        setImagesIds(data);
        setLoadingImage(false)
      })
      .catch((e) => {
        console.error(
          "Error during updating the imagesIds \n" + JSON.stringify(e)
        );
        setLoadingImage(false)
      });

  };


  const carImage = imagesIds.length > 0 ? imageUri(imagesIds[0]) : "https://www.downloadclipart.net/large/car-png-photos.png";

  return (
    <div className="flex-col flex-j-between flex-a-center border-radius-30 w-300 h-400 bg-white mb-20 pt-30 pb-30 pl-10 pr-10">
      <div className="flex-col w-250">
        <p className="brand-header font-weight-800 s-32 text-c6 m-0 as-start">
          {props.car.brand}
        </p>
        <p className="model-header s-18 m-0 text-dark font-weight-400 as-start">
          {props.car.model}
        </p>
      </div>
      <div className="flex-row flex-a-start w-250">
          {loadingImage ? <Loader/> :
          <img src={carImage} alt="car image" className="car-img" />}
      </div>
      <button
        className="bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border"
        onClick={(_) => props.onShowDetails(props.car)}
      >
        Details
      </button>
    </div>
  );
};

export default CarListItem;
