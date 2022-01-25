import React, {useEffect, useState} from "react";
import CarListItem from "../components/car/CarListItem";
import {Car} from "../objects/Car";
import {addCar, deleteCar, getCarsWithParams, updateCar, uploadImage} from "../logic/api";
import PureModal from "react-pure-modal";
import CarDetails from "../components/car/CarDetails";
import CarEditor from "../components/car/CarEditor";
import useLogin from "../modules/useLogin";
import {useLocation} from "react-router-dom";
import '../styles/CarList.css'
import ReactPaginate from 'react-paginate';

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
    const [carsPerPage] = useState(8);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        updateList()
    }, [page, location.search]);

    const updateList = () => {
        getCarsWithParams(authToken, page, carsPerPage, location.search.substring(1)).then(response => {
            setPageCount(response.pageCount)
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
        }).finally(() => {
            updateList()
        })
        setShowDetails(false)
    }

    const handleEdit = () => {
        setShowDetails(false)
        setShowEditor(true)
    }

    const handleSave = (car: Car, file: File | null) => {
        updateCar(car, authToken).catch((e) => {
            console.error("Error during updating the car\n" +
                JSON.stringify(e));
        }).finally(()=>{updateList()})

        if (file)
        {
            uploadImage(car.id, file, authToken).catch((e) => {
                console.error("Error during updating the car\n" +
                    JSON.stringify(e));
            }).finally(()=>{updateList()})
        }
    }

    const handleSaveNew = (car: Car, file: File | null) => {
        addCar(car, authToken).catch((e) => {
            console.error("Error during adding the car\n" +
                JSON.stringify(e));
        }).finally(()=>{updateList()})

        if (file)
        {
            uploadImage(car.id, file, authToken).catch((e) => {
                console.error("Error during updating the car\n" +
                    JSON.stringify(e));
            }).finally(()=>{updateList()})
        }
    }

    return (
        <div className="car-list-view">
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
                    saveHandler={(car, file) => {
                        handleSave(car, file);
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
                    saveHandler={(car, file) => {
                        handleSaveNew(car, file);

                        setShowNew(false)
                    }}/>
            </PureModal>

            {/*<button onClick={() => setShowNew(true)}>New Car</button>*/}
            <div className="car-list">
                {cars.map((car) => {
                        return (
                            <CarListItem key={car.id} car={car} onShowDetails={handleShowDetails}/>
                        )
                    }
                )}
            </div>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={(event) => setPage(event.selected)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}

                pageClassName="page-item"
                pageLinkClassName="page-link"

                previousLabel="< previous"
                previousClassName="page-item"
                previousLinkClassName="page-link"

                nextClassName="page-item"
                nextLinkClassName="page-link"

                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"

                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={undefined}
            />
        </div>
    );
};

export default CarList;
