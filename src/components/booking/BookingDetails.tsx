import React from 'react'
import {Booking} from "../../objects/Booking"

interface BookingDetailsProps {
    booking: Booking
}

const BookingDetails: React.FC<BookingDetailsProps> = (props: BookingDetailsProps) => {
    return (
        <>
            <p>Client ID</p>
            <h1>{props.booking.clientId}</h1>

            <p>Car ID</p>
            <h2>{props.booking.carId}</h2>

            <p>Start date</p>
            <h3>{props.booking.startDate.toString()}</h3>

            <p>Active:</p>
            <h3>{props.booking.active.toString()}</h3>

            <button>Delete</button>
            <button>Edit</button>
        </>
    )
}

export default BookingDetails
