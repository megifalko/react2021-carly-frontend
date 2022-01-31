import React, {useEffect, useState} from "react";
import CarListItem from "../components/car/CarListItem";
import {Car} from "../objects/Car";
import {
    deleteCar,
    deleteImage,
    getCarsWithParams,
    updateCar,
    uploadImage,
} from "../logic/api";
import PureModal from "react-pure-modal";
import CarDetails from "../components/car/CarDetails";
import CarEditor from "../components/car/CarEditor";
import useLogin from "../modules/useLogin";
import {useLocation} from "react-router-dom";
import "../styles/CarList.css";
import ReactPaginate from "react-paginate";
import Loader from "../components/utils/Loader";
import NotFound from "./NotFound";

const defaultCar: Car = {
    id: "",
    price: 1,
    brand: "",
    model: "",
    location: "",
    year: 1,
    engine: "",
};

const CarList = () => {
    const location = useLocation();
    const {authToken} = useLogin();
    const [cars, setCars] = useState<Car[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [details, setDetails] = useState<Car>(defaultCar);
    const [carsPerPage] = useState(8);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [loadingList, setLoadingList] = useState(true);

    useEffect(() => {
        setLoadingList(true)
        updateList();
    }, [page, location.search]);

    const updateList = () => {
        setLoadingList(true)
        getCarsWithParams(
            authToken,
            page,
            carsPerPage,
            location.search.substring(1)
        )
            .then((response) => {
                setPageCount(response.pageCount);
                setCars(response.data);
                setLoadingList(false);
            })
            .catch((e) => {
                console.error(
                    "Error during updating the car list \n" + JSON.stringify(e)
                );
                setLoadingList(false);
            });
    };

    const handleShowDetails = (car: Car) => {
        setDetails(car);
        setShowDetails(true);
    };

    const handleClose = (setShow: Function) => {
        setShow(false);
    };

    const handleDelete = () => {
        deleteCar(details.id, authToken)
            .then(()=>
            {
                updateList();
            })
            .catch((e) => {
                console.error("Error during deleting the car\n" + JSON.stringify(e));
            })
        setShowDetails(false);
    };

    const handleEdit = () => {
        setShowDetails(false);
        setShowEditor(true);
    };

    const handleSave = (
        car: Car,
        uploadedImages: File[],
        imgsToDelete: string[] = []
    ) => {
        updateCar(car, authToken)
            .catch((e) => {
                console.error("Error during updating the car\n" + JSON.stringify(e));
            })
            .finally(() => {
                updateList();
            });

        Promise.all(
            uploadedImages.map((img) => uploadImage(car.id, img, authToken))
        )
            .catch((e) => {
                console.error("Error during uploading image\n" + JSON.stringify(e));
            })
            .finally(() => {
                updateList();
            });

        Promise.all(imgsToDelete.map((img) => deleteImage(img, authToken)))
            .catch((e) => {
                console.error("Error during deleting image\n" + JSON.stringify(e));
            })
            .finally(() => {
                updateList();
            });
    };

    return (
        <div>
            <PureModal
                header="Car Details"
                onClose={() => {
                    handleClose(setShowDetails);
                    return true;
                }}
                isOpen={showDetails}
            >
                <CarDetails
                    car={details}
                    editHandler={handleEdit}
                    deleteHandler={handleDelete}
                />
            </PureModal>

            <PureModal
                header="Car editor"
                onClose={() => {
                    handleClose(setShowEditor);
                    return true;
                }}
                isOpen={showEditor}
            >
                <CarEditor
                    car={details}
                    cancelHandler={() => setShowEditor(false)}
                    saveHandler={(car, uploadedImages, imgsToDelete) => {
                        handleSave(car, uploadedImages, imgsToDelete);
                        setShowEditor(false);
                    }}
                />
            </PureModal>
            {
                loadingList ? (<Loader/>) : cars.length == 0 ?
                    (<NotFound/>) :
                    (<>
                        <div className="flex-row wrap flex-j-center flex-ac-start col-gap-30 pt-30">
                            {cars.map((car) => {
                                return (
                                    <CarListItem
                                        key={car.id}
                                        car={car}
                                        onShowDetails={handleShowDetails}
                                    />
                                );
                            })}
                        </div>
                        <div className="flex-row flex-j-center">
                            <ReactPaginate
                                forcePage={page}
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
                    </>)
            }
        </div>

    );
};

export default CarList;