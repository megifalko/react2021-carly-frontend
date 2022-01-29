import React from "react";
import {Booking} from "../../objects/Booking"
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';

interface BookingListItemProps {
    booking: Booking;
    onShowDetails: Function
}

const BookingListItem: React.FC<BookingListItemProps> = (props: BookingListItemProps) => {
    return (
    <div className="flex-col flex-j-between flex-a-start border-radius-30 w-800 h-200 bg-white mb-20 p-30">
        <p>Start date: {props.booking.startDate.toString()}</p>
        <p>Booking active: {props.booking.active.toString()}</p>
        <img/>
        <button onClick={() => props.onShowDetails(props.booking)}>Details</button>
    </div>
  );
};

export default BookingListItem;
