import React, { useEffect, useState } from "react";
import { Car } from "../../objects/Car";
import { getImagesIds, imageUri } from "../../logic/api";
import ImageGallery from "react-image-gallery";
import useLogin from "../../modules/useLogin";

interface CarDetailsProps {
  car: Car;
  editHandler: Function;
  deleteHandler: Function;
}

const CarDetails: React.FC<CarDetailsProps> = (props) => {
  const { authToken } = useLogin();
  const [imagesIds, setImagesIds] = useState<string[]>([]);

  useEffect(() => {
    updateImagesIds();
  }, [props.car]);

  const updateImagesIds = () => {
    getImagesIds(props.car.id, authToken)
      .then((data) => {
        setImagesIds(data);
      })
      .catch((e) => {
        console.error(
          "Error during updating the imagesIds \n" + JSON.stringify(e)
        );
      });
  };

  const carImages = imagesIds.map((id) => {
    return { original: imageUri(id) };
  });

  return (
    <div className="flex-col">
      <p>Brand</p>
      <h2>{props.car.brand}</h2>

      <p>Model</p>
      <h2>{props.car.model}</h2>

      <ImageGallery
        items={carImages}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
      />

      <p>Year</p>
      <h3>{props.car.year}</h3>

      <p>Engine</p>
      <h3>{props.car.engine}</h3>

      <p>Location</p>
      <h3>{props.car.location}</h3>

      <p>Price</p>
      <h2>{props.car.price}</h2>
      <span>/day</span>
      <div className="flex-row flex-j-center">
        <button
          className="bg-c9 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mr-10"
          onClick={(_) => props.deleteHandler()}
        >
          Delete
        </button>
        <button
          className="bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border ml-10"
          onClick={(_) => props.editHandler()}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
