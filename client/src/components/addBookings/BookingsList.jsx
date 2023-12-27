import { useState } from "react";
import BookingListItem from "./BookingListItem";
import { Table } from "react-bootstrap";
import axios from "axios";
import { io } from "socket.io-client";
import EditBooking from "../editBooking/EditBooking";
const URL = "http://127.0.0.1:3001";
const socket = io(URL);

const BookingsList = ({ bookings, categories }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [bookingId, setBookingId] = useState("");

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

  const handleEdit = (id) => {
    setShowEdit(!showEdit);
    setBookingId(id);
    console.log(id);
  };

  /*  ---------------------------------------------------------- */

  return (
    <div className="bookingList">
      {showEdit ? (
        <EditBooking
          bookingId={bookingId}
          handleEdit={handleEdit}
          categories={categories}
          bookings={bookings}
        />
      ) : (
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
            {bookings
              .sort((a, b) => (a.category.name > b.category.name ? 1 : -1))
              // .sort(
              //   (a, b) => a.category.name - b.category.name
              //   a.start.hour - b.start.hour
              // )

              .map((booking, index) => (
                <BookingListItem
                  booking={booking}
                  key={index}
                  deleteBooking={deleteBooking}
                  handleEdit={handleEdit}
                />
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BookingsList;
