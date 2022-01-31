import React, { useEffect, useState } from "react";
import { Booking } from "../../objects/Booking";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { getImagesIds, imageUri } from "../../logic/api";
import useLogin from "../../modules/useLogin";

interface BookingListItemProps {
  booking: Booking;
  onShowDetails: Function;
  onCancelDetails: Function;
}

const BookingListItem: React.FC<BookingListItemProps> = (
  props: BookingListItemProps
) => {
  const { authToken } = useLogin();
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    getImagesIds(props.booking.carId, authToken).then((id) => {
      setImageURL(id.length > 0 ? imageUri(id[0]) : "https://www.downloadclipart.net/large/car-png-photos.png");
    });
  }, [props.booking.carId, authToken]);
  return (
      <div className="flex-col flex-j-between border-radius-30 w-800 h-250 bg-white mb-20 p-30">
      <div className="flex-row flex-j-center w-800">
        <div className="flex-col flex-a-start flex-j-center w-300">
          <img src={imageURL} alt="car" className="car-img" />
        </div>
        <div className="flex-col flex-j-center flex-a-center w-250">
          <p className="model-header s-18 m-0 text-dark font-weight-400 as-start">
            Customer:{" "}
          </p>
          <p className="font-weight-800 s-28 text-c6 m-0 as-start">
            {(props.booking.customerFirstName ?? "") + " " + (props.booking.customerLastName ?? "") == " " ?
            "-" :
            (props.booking.customerFirstName ?? "") + " " + (props.booking.customerLastName ?? "")}
          </p>
          <p className="model-header s-18 m-0 text-dark font-weight-400 as-start">
            Start date:{" "}
          </p>
          <p className="font-weight-800 s-28 text-c6 m-0 as-start">
            {props.booking.startDate.toString().split("T")[0]}
          </p>
          <p className="model-header s-18 m-0 text-dark font-weight-400 as-start">
            Booking active:{" "}
          </p>
          <p className="font-weight-800 s-28 text-c6 m-0 as-start">
            {props.booking.active ? "Yes" : "No"}
          </p>
        </div>
        <div className="flex-col flex-j-center w-250 h-200">
          <button
            className="bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border "
            onClick={() => props.onShowDetails(props.booking)}
          >
            Details
          </button>
          <button
            className="bg-c9 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mt-20"
            onClick={() => props.onCancelDetails(props.booking)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingListItem;
