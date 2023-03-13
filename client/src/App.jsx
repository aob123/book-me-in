import { useState, useEffect } from "react";
import { categories } from "./settings/Categories";
import { OpenHours } from "./settings/OpenHours";

import axios from "axios";
import io from "socket.io-client";
import dayjs from "dayjs";

import { socket } from "./socket";
import AddBookingPage from "./pages/AddBookingPage";
import BookingPage from "./pages/BookingPage";
import ClosedPage from "./pages/ClosedPage";
import useAxios from "./hooks/useAxios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // const url = "http://localhost:3000/api/getAll";
  const url = "http://localhost:3001/api/getAll";
  const { data } = useAxios(url);
  const [view, setView] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);
  console.log(data);
  console.log(bookings);
  /* ---------------------------------------------------------- */
  //Set date: gets the day of the week (0 - 6)

  useEffect(() => {
    let getDate = dayjs().day();
    let today = getDate++;
    // setDate(today);
    setDate(5);
  }, []);

  /* ---------------------------------------------------------- */
  //Set bookings

  useEffect(() => {
    setBookings(data);
  }, [data]);

  /* ---------------------------------------------------------- */
  //Socket events

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("recieve_booking", (booking) => {
      console.log("UPDATED", booking);
      setBookings((prevState) => [...prevState, booking]);
      // setBookings(data);
    });
    socket.on("remove_booking", () => {
      console.log(`Socket recieved delete request for ${data}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== id)
      );
    });
    console.log("FIRED!");

    return () => {
      socket.off("recieve_booking");
      socket.off("remove_booking");
    };
  }, [data]);

  /* ----------------------------------------------------------- */
  //Handle view: Changes the view between add bookings and
  //view bookings page

  const handleView = () => {
    setView(!view);
  };

  /* ----------------------------------------------------------- */
  //Display closed message when hours (in OpenHours) are null

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
          socket={socket}
        />
      ) : (
        <BookingPage
          handleView={handleView}
          categories={categories}
          bookings={bookings}
          date={date}
          socket={socket}
        />
      )}
    </div>
  );
}

export default App;
