import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../components/header/Header";
import Time from "../components/time/Time";
import Bookings from "../components/bookings/Bookings";
import dayjs from "dayjs";

const BookingPage = ({ handleView, bookings, categories, date, socket }) => {
  return (
    <main className="booking-page">
      <Header categories={categories} handleView={handleView} />
      <div className="bookingPageGrid">
        <Time date={date} />
        <Bookings
          categories={categories}
          bookings={bookings}
          date={date}
          socket={socket}
        />
      </div>
    </main>
  );
};

export default BookingPage;
