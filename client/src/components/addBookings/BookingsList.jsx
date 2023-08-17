import BookingListItem from "./bookingListItem";
import { Table } from "react-bootstrap";
import axios from "axios";
import { io } from "socket.io-client";
const URL = "http://127.0.0.1:3001";
const socket = io(URL);

const BookingsList = ({ bookings }) => {
  const deleteBooking = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/delete/${id}`
      );

      socket.emit("delete_booking", id);
    } catch (error) {
      console.log(error.message);
    }
  };

  /*  ---------------------------------------------------------- */

  return (
    <div className="bookingList">
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Category</th>
            <th>Start</th>
            <th>End</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <BookingListItem
              booking={booking}
              key={index}
              deleteBooking={deleteBooking}
            />
          ))}
        </tbody>
      </Table>
      {/* <div className="brHeader">
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
      </div> */}
    </div>
  );
};

export default BookingsList;
