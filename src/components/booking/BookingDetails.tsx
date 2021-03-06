import React, { useEffect, useState } from "react";
import { Booking } from "../../objects/Booking";
import useLogin from "../../modules/useLogin";
import { getImagesIds, imageUri } from "../../logic/api";

interface BookingDetailsProps {
  booking: Booking;
}

const BookingDetails: React.FC<BookingDetailsProps> = (
  props: BookingDetailsProps
) => {
  const { authToken } = useLogin();
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    getImagesIds(props.booking.carId, authToken).then((id) => {
      console.log(id);
      setImageURL(id.length > 0 ? imageUri(id[0]) : "https://www.downloadclipart.net/large/car-png-photos.png");
    });
  }, [props.booking.carId, authToken]);
  return (
    <div className="flex-row w-600">
      <div className="flex-col w-350 flex-j-center flex-a-start">
        <img src={imageURL} alt="car" className="car-img" />
      </div>
      <div className="flex-col w-250 pl-10 flex-j-center flex-a-start">
        <p className="s-16">Customer</p>
        <h2 className="s-24 m-neg">
          {
            (props.booking.customerFirstName ?? "") + " " + (props.booking.customerLastName ?? "") === " " ?
                "-" :
                props.booking.customerFirstName + " " + props.booking.customerLastName
          }
        </h2>

        <p className="s-16">Car ID</p>
        <h2 className="s-24 m-neg">{props.booking.carId}</h2>

        <p className="s-16">Start date</p>
        <h2 className="s-24 m-neg">{props.booking.startDate.toString().split("T")[0]}</h2>

        <p className="s-16">End date</p>
        <h2 className="s-24 m-neg">{props.booking.endDate.toString().split("T")[0]}</h2>

        <p className="s-16">Active:</p>
        <h2 className="s-24 m-neg">{props.booking.active ? "Yes" : "No"}</h2>
      </div>
    </div>
  );
};

export default BookingDetails;
