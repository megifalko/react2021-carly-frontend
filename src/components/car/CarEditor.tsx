import React, { useEffect, useState } from "react";
import { Car } from "../../objects/Car";
import "react-upload-gallery/dist/style.css";
import "../../styles/CarEditor.css";
import { getImagesIds, imageUri } from "../../logic/api";
import useLogin from "../../modules/useLogin";

interface CarEditorProps {
  cancelHandler: Function;
  saveHandler: (
    car: Car,
    uploadedImages: File[],
    imgsToDelete: string[]
  ) => void;
  car?: Car;
}

const emptyCar: Car = {
  id: "",
  price: 1,
  brand: "",
  model: "",
  location: "",
  year: 2022,
  engine: "",
};

const CarEditor: React.FC<CarEditorProps> = ({
  car = emptyCar,
  cancelHandler,
  saveHandler,
}) => {
  const [editedCar, setEditedCar] = useState(car);

  const updateBrand = (brand: string) => {
    setEditedCar({ ...editedCar, brand: brand });
  };

  const updateModel = (model: string) => {
    setEditedCar({ ...editedCar, model: model });
  };

  const updateYear = (year: number) => {
    setEditedCar({ ...editedCar, year: year });
  };

  const updateEngine = (engine: string) => {
    setEditedCar({ ...editedCar, engine: engine });
  };

  const updateLocation = (location: string) => {
    setEditedCar({ ...editedCar, location: location });
  };

  const updatePrice = (price: number) => {
    if (price )
    setEditedCar({ ...editedCar, price: price });
  };

  const galleryItem = (image: string, id: Number, removeHandler: Function) => {
    return (
      <div key={image}>
        <img src={image} className="img-preview" alt="image preview"/>
        <button onClick={() => removeHandler(id)}>X</button>
      </div>
    );
  };

  const { authToken } = useLogin();
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [initialImageIds, setInitialImageIds] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  useEffect(() => {
    if (car == emptyCar) return;
    getImagesIds(car.id, authToken)
      .then((data) => {
        setImageIds(data);
        setInitialImageIds(data);
      })
      .catch((e) => {
        console.error(
          "Error during updating the imageIds \n" + JSON.stringify(e)
        );
      });
  }, []);

  return (
    <>
      <div className="flex-row w-600 flex-j-between">
        <div className="flex-col w-250 pl-10">
          <p className="m-0 text-black">Brand</p>
          <input
            className="input-border w-200"
            defaultValue={car.brand}
            placeholder="Brand"
            onChange={(e) => updateBrand(e.target.value)}
          />

          <p className="m-0 text-black">Model</p>
          <input
            className="input-border w-200"
            defaultValue={car.model}
            placeholder="Model"
            onChange={(e) => updateModel(e.target.value)}
          />

          <div>
            <p className="m-0 text-black">Images</p>
            <input
              className="m-0 p-0 upload w-250 text-black mt-15"
              accept="image/*"
              type="file"
              onChange={(event) => {
                if (event.target.files)
                  setUploadedImages([...uploadedImages, event.target.files[0]]);
              }}
            />
            <div className="upload">
              {uploadedImages.map((img, id) =>
                galleryItem(URL.createObjectURL(img), id, (id: Number) =>
                  setUploadedImages(
                    uploadedImages.filter((img, imgId) => imgId != id)
                  )
                )
              )}
              {imageIds.map((img, id) =>
                galleryItem(imageUri(img), id, (id: Number) =>
                  setImageIds(imageIds.filter((img, imgId) => imgId != id))
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex-col w-250 pl-10">
          <p className="m-0 text-black">Year</p>
          <input
            className="input-border w-200"
            type={"number"}
            min="1800"
            max="2050"
            defaultValue={car.year}
            placeholder="2022"
            onChange={(e) => updateYear(Number(e.target.value))}
          />

          <p className="m-0 text-black">Engine</p>
          <input
            className="input-border w-200"
            defaultValue={car.engine}
            placeholder="Engine"
            onChange={(e) => updateEngine(e.target.value)}
          />

          <p className="m-0 text-black">Location</p>
          <input
            className="input-border w-200"
            defaultValue={car.location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />

          <p className="m-0 text-black">Price</p>
          <input
            className="input-border w-200"
            type={"number"}
            min={1}
            defaultValue={car.price}
            onChange={(e) => updatePrice(Number(e.target.value))}
          />
          <span>/day</span>
        </div>
      </div>
      <div className="flex-row flex-j-center mt-40">
        <button
          className="bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mr-10"
          onClick={(_) =>
            saveHandler(
              editedCar,
              uploadedImages,
              initialImageIds.filter((img) => !imageIds.includes(img))
            )
          }
        >
          Save
        </button>
        <button
          className="bg-c9 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border ml-10"
          onClick={(_) => cancelHandler()}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default CarEditor;
