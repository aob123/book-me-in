import React from "react";
import AddBookingHeader from "../components/addBookingHeader/AddBookingHeader";
import AddBookings from "../components/addBookings/AddBookings";
import BookingsList from "../components/addBookings/BookingsList";

const AddBookingPage = ({ handleView, categories, bookings, date, socket }) => {
  return (
    <main className="add-bookings">
      <AddBookingHeader handleView={handleView} date={date} />
      <section>
        <AddBookings
          handleView={handleView}
          categories={categories}
          bookings={bookings}
          socket={socket}
        />
        <BookingsList bookings={bookings} socket={socket} />
      </section>
    </main>
  );
};

export default AddBookingPage;
