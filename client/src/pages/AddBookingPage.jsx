import React from "react";
import AddBookingHeader from "../components/addBookingHeader/AddBookingHeader";
import AddBookings from "../components/addBookings/AddBookings";
import BookingsList from "../components/addBookings/BookingsList";

const AddBookingPage = ({ handleView, categories, bookings, date }) => {
  return (
    <main className="add-bookings">
      <AddBookingHeader handleView={handleView} date={date} />
      <section>
        <AddBookings
          handleView={handleView}
          categories={categories}
          bookings={bookings}
        />
        <BookingsList bookings={bookings} />
      </section>
    </main>
  );
};

export default AddBookingPage;
