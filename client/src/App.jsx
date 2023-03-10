import { useState, useEffect } from "react";
import { categories } from "./settings/Categories";
import { OpenHours } from "./settings/OpenHours";

import axios from "axios";
import io from "socket.io-client";
import dayjs from "dayjs";

const socket = io.connect("http://localhost:3000");
import AddBookingPage from "./pages/AddBookingPage";
import BookingPage from "./pages/BookingPage";
import ClosedPage from "./pages/ClosedPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const url = "http://localhost:3000/api/getAll";
  const [view, setView] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(0);

  /* ---------------------------------------------------------- */
  //Set date

  // console.log("APP BOOKIGNS", bookings);

  useEffect(() => {
    let getDate = dayjs().day();
    let today = getDate++;
    setDate(today);
    // console.log("APP", today);
  }, []);

  /* ---------------------------------------------------------- */
  //Socket events

  useEffect(() => {
    //Add new booking
    socket.on("recieve_booking", (booking) => {
      console.log("UPDATED", booking);
      getData();
      setBookings((prevState) => [...prevState, booking]);
    });

    //Delete booking
    socket.on("remove_booking", (data) => {
      let id = data;
      console.log(`Socket recieved delete request for ${data}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    });

    //Fetch data
    const getData = async () => {
      const response = await axios.get(url);
      setBookings(response.data);
    };

    getData();
  }, [socket]);

  /* ----------------------------------------------------------- */
  //Handle view

  const handleView = () => {
    setView(!view);
  };

  /* ----------------------------------------------------------- */
  //Display closed message when hours are null

  if (OpenHours[date].open.hour === null) {
    return <ClosedPage OpenHours={OpenHours} />;
  }

  /* ----------------------------------------------------------- */
  //Display message if database can not be reached

  if (!bookings) {
    return (
      <div>Can not load bookings from database, please check connection!</div>
    );
  }

  /* ----------------------------------------------------------- */

  return (
    <div className="App">
      {view ? (
        <AddBookingPage
          handleView={handleView}
          categories={categories}
          bookings={bookings}
          date={date}
        />
      ) : (
        <BookingPage
          handleView={handleView}
          categories={categories}
          bookings={bookings}
          date={date}
        />
      )}
    </div>
  );
}

export default App;
