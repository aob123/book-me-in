import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../components/header/Header";
import Time from "../components/time/Time";
import Bookings from "../components/bookings/Bookings";
import dayjs from "dayjs";

const BookingPage = ({ handleView, bookings, categories, date }) => {
  return (
    <main className="view-bookings">
      <div className="time-header">
        <Button onClick={handleView}>Booking</Button>
      </div>
      <Header categories={categories} />
      <Time date={date} />
      <Bookings categories={categories} bookings={bookings} date={date} />
    </main>
  );
};

export default BookingPage;
