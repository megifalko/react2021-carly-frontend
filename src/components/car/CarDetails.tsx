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
    <>
      <div className="flex-row w-600">
        <div className="flex-col w-250 pl-10">
          <p className="m-0">Brand</p>
          <h2 className="m-0">{props.car.brand}</h2>
          <div className="flex-row flex-j-between pr-20 mt-10">
            <p className="m-0">Model</p>
            <p className="m-0">Year</p>
          </div>
          <div className="flex-row flex-j-between pr-20">
            <h2 className="m-0">{props.car.model}</h2>
            <h2 className="m-0 text-green">{props.car.year}</h2>
          </div>
          <p className="m-0 mt-50">Engine</p>
          <h3 className="m-0">{props.car.engine}</h3>
          <p className="m-0 mt-5">Location</p>
          <h3 className="m-0">{props.car.location}</h3>
        </div>
        <div className="flex-col w-350 flex-j-between">
          {" "}
          <ImageGallery
            items={carImages}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
          />
          <div className="flex-col">
            <div className="flex-row flex-j-end flex-a-end">
              <h2 className="as-end pr-10 text-green s-28">
                $ {props.car.price}
              </h2>
            </div>
            <div className="flex-row flex-j-end flex-a-end">
              <span className="as-end pr-10">/day</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-row flex-j-center mt-40">
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
    </>
  );
};

export default CarDetails;
