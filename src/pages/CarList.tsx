import React, {useEffect, useState} from "react";
import CarListItem from "../components/car/CarListItem";
import {Car} from "../objects/Car";
import {addCar, deleteCar, getCarsWithParams, updateCar} from "../logic/api";
import PureModal from "react-pure-modal";
import CarDetails from "../components/car/CarDetails";
import CarEditor from "../components/car/CarEditor";
import useLogin from "../modules/useLogin";
import {useLocation} from "react-router-dom";

const defaultCar: Car = {
    id: "fasd",
    price: 123,
    brand: "Toyota",
    model: "Yaris",
    location: "Tralala",
    year: 2021,
    engine: "strong"
}

const CarList = () => {
    const location = useLocation()

    const {authToken} = useLogin();
    const [cars, setCars] = useState<Car[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [details, setDetails] = useState<Car>(defaultCar);
    const [carsPerPage] = useState(3);
    const [page, setPage] = useState(0);

    useEffect(() => {
        updateList()
    }, [page, location.search]);

    const updateList = () => {
        getCarsWithParams(authToken, page,carsPerPage, location.search.substring(1)).then(response => {
            setCars(response.data);
        }).catch((e) => {
            console.error("Error during updating the car list \n" +
                JSON.stringify(e));
        })
    }
    const handleShowDetails = (car: Car) => {
        setDetails(car)
        setShowDetails(true);
    }

    const handleClose = (setShow: Function) => {
        setShow(false)
    }

    const handleDelete = () => {
        deleteCar(details.id, authToken).catch((e) => {
            console.error("Error during deleting the car\n" +
                JSON.stringify(e));
        })
        setShowDetails(false)
    }

    const handleEdit = () => {
        setShowDetails(false)
        setShowEditor(true)
    }

    const handleSave = (car: Car) => {
        updateCar(car, authToken).catch((e) => {
            console.error("Error during updating the car\n" +
                JSON.stringify(e));
        })
    }

    const handleSaveNew = (car: Car) => {
        addCar(car, authToken).catch((e) => {
            console.error("Error during adding the car\n" +
                JSON.stringify(e));
        })
    }

    return (
        <>
            <h1>Car list</h1>

            <PureModal
                header="Car details"
                onClose={() => {
                    handleClose(setShowDetails)
                    return true;
                }}
                isOpen={showDetails}
            >
                <CarDetails
                    car={details}
                    editHandler={handleEdit}
                    deleteHandler={handleDelete}/>
            </PureModal>

            <PureModal
                header="Car editor"
                onClose={() => {
                    handleClose(setShowEditor)
                    return true;
                }}
                isOpen={showEditor}
            >
                <CarEditor
                    car={details}
                    cancelHandler={() => setShowEditor(false)}
                    saveHandler={(car) => {
                        handleSave(car);
                        setShowEditor(false)
                    }}/>
            </PureModal>

            <PureModal
                header="New car"
                onClose={() => {
                    handleClose(setShowNew)
                    return true;
                }}
                isOpen={showNew}
            >
                <CarEditor
                    cancelHandler={() => setShowNew(false)}
                    saveHandler={(car) => {
                        handleSaveNew(car);
                        setShowEditor(false)
                    }}/>
            </PureModal>

            <button onClick={()=>console.log(location.search)}>Show query</button>
            <button onClick={() => setShowNew(true)}>New Car</button>
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>{"<"}</button>
            <button onClick={() => setPage(page + 1)}>{">"}</button>
            {cars.map((car) => {
                    return (
                        <CarListItem key={car.id} car={car} onShowDetails={handleShowDetails}/>
                    )
                }
            )}
        </>
    );
};

export default CarList;
