import React, {useEffect, useState} from "react";
import CarListItem from "../components/car/CarListItem";
import {useDispatch, useSelector} from "react-redux";
import {CarsState, updateCars} from "../store/CarsSlice";
import {AuthState} from "../store/AuthSlice";
import {Car} from "../objects/Car";
import { Outlet } from 'react-router-dom'
import {addCar, deleteCar, getCarsWithParams, updateCar} from "../logic/api";
import PureModal from "react-pure-modal";
import CarDetails from "../components/car/CarDetails";
import CarEditor from "../components/car/CarEditor";
import useLogin from "../modules/useLogin";


const defaultCar: Car = {
    id: "fasd",
    price: 123,
    brand: "Toyota",
    model: "Yaris",
    location: "Tralala",
    year: 2021,
    engine: "strong"
}

const carsPerPage = 2

const CarList = () => {
    const {securityToken} = useLogin();
    const [cars, setCars] = useState<Car[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [details, setDetails] = useState<Car>(defaultCar)
    const [page, setPage] = useState(0);

    useEffect(() => {
        updateList()
    }, [page]);

    const updateList = () => {
        getCarsWithParams(page, carsPerPage, securityToken).then(data => {
            setCars(data);
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
        deleteCar(details.id, securityToken).catch((e) => {
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
        updateCar(car, securityToken).catch((e) => {
            console.error("Error during updating the car\n" +
                JSON.stringify(e));
        })
    }

    const handleSaveNew = (car: Car) => {
        addCar(car, securityToken).catch((e) => {
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

            <button onClick={() => setShowNew(true)}>New Car</button>
            <button onClick={() => setPage(page - 1)} disabled={page == 0}>{"<"}</button>
            <button onClick={() => setPage(page + 1)}>{">"}</button>
            {cars.map((car) => {
                    return (
                        <CarListItem car={car} onShowDetails={handleShowDetails}/>
                    )
                }
            )}
            {/*<CarListItem car={defaultCar} onShowDetails={handleShowDetails}/>*/}
        </>
    );
};

export default CarList;
