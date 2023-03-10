import { Button } from "react-bootstrap";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
import BookingListItem from "./bookingListItem";
import axios from "axios";

const BookingsList = ({ bookings }) => {
  const deleteBooking = (id) => {
    axios
      .delete(`http://localhost:3000/api/delete/${id}`)
      .then((res) => {
        // setBookings((prevBookings) =>
        //   prevBookings.filter((booking) => booking._id !== id)
        // );
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
    socket.emit("delete_booking", id);
  };

  /*  ---------------------------------------------------------- */

  return (
    <div className="bookingList">
      <div className="brHeader">
        <p>Name</p>
        <p>Category</p>
        <p>Start</p>
        <p>End</p>
      </div>
      <div
        className="list"
        style={{ gridTemplateRows: `repeat(${bookings.length}, 100px` }}
      >
        {bookings.map((booking, index) => (
          <BookingListItem
            booking={booking}
            key={index}
            deleteBooking={deleteBooking}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingsList;
