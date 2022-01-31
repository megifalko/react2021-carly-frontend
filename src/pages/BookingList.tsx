import React, {useEffect, useState} from "react";
import BookingListItem from "../components/booking/BookingListItem";
import {Booking} from "../objects/Booking";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import BookingDetails from "../components/booking/BookingDetails";
import {deactivateBooking, getBookingsFiltered} from "../logic/api";
import useLogin from "../modules/useLogin";
import ReactPaginate from "react-paginate";
import {useLocation} from "react-router-dom";

const BookingList = () => {
    const {authToken} = useLogin()
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [details, setDetails] = useState<Booking>({
        active: false,
        carId: "",
        customerFirstName: "",
        customerLastName: "",
        id: "",
        startDate: new Date(0),
        endDate: new Date(0),
    })

    useEffect(() => {
        updateList(page)
    }, [page, location]);

    const handleShow = (booking: Booking) => {
        setDetails(booking)
        setShow(true);
    }
    const handleClose = () => setShow(false)
    const handleCancel = (booking: Booking, securityToken: string) => {
        deactivateBooking(booking.id, securityToken).catch((e) => {
            console.error("Error during canceling the booking\n" +
                JSON.stringify(e));
        })
    }
    const updateList = (page: number) => {
        getBookingsFiltered(authToken, page, location.search.substring(1)).then(data => {
            setBookings(data.data);
            setPageCount(data.pageCount);
        }).catch((e) => {
            console.error("Error during updating the bookings list \n" +
                JSON.stringify(e));
        })
    }

    return (
        <div className="flex-col flex-a-center flex-ac-center col-gap-30 pt-30">
            <PureModal
                header=""
                onClose={() => {
                    handleClose()
                    return true;
                }}
                isOpen={show}
            >
                <BookingDetails booking={details}/>
            </PureModal>
            {bookings.map((booking: Booking) =>
                <BookingListItem booking={booking}
                                 key={booking.id}
                                 onShowDetails={handleShow}
                                 onCancelDetails={handleCancel}/>
            )}
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

export default BookingList;
