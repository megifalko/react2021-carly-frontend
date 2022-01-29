import React, {useState} from "react";
import BookingListItem from "../components/booking/BookingListItem";
import {Booking} from "../objects/Booking";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import BookingDetails from "../components/booking/BookingDetails";

const defaultBooking: Booking = {
    clientId: "123456789",
    carId: "qwertyuiop",
    startDate: new Date(2021, 12, 28, 12, 43),
    active: true
}

const BookingList = () => {
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState(defaultBooking)

    const handleShow = (booking: Booking) => {
        setDetails(booking)
        setShow(true);
    }
    const handleClose = () => setShow(false)

    return (
        <div className="flex-row wrap flex-j-center flex-ac-start col-gap-30 pt-30">
            <PureModal
                header="Booking details"
                onClose={() => {
                    handleClose()
                    return true;
                }}
                isOpen={show}
            >
                <BookingDetails booking={details}/>
            </PureModal>

            <BookingListItem booking={defaultBooking} onShowDetails={handleShow}/>
            <BookingListItem booking={defaultBooking} onShowDetails={handleShow}/>
            <BookingListItem booking={defaultBooking} onShowDetails={handleShow}/>
        </div>
    );
};

export default BookingList;
