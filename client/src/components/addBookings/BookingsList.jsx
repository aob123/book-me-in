import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
import BookingListItem from "./bookingListItem";
import axios from "axios";

const BookingsList = ({ bookings }) => {
  const deleteBooking = async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/api/delete/${id}`
    );

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
