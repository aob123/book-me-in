import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Time from "./components/time/Time";
import Bookings from "./components/bookings/Bookings";
import { categories } from "./settings/Categories";
import AddBookings from "./components/addBookings/AddBookings";
import Axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

function App() {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(null);
  const [hoursOpen, setHoursOpen] = useState(0);
  const [view, setView] = useState(false);
  const [bookings, setBookings] = useState();

  // console.log("APPB OOKINGS", bookings);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/getAll")
      .then((res) => setBookings(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Socket
  useEffect(() => {
    socket.on("recieve_booking", (data) => {
      console.log(`Socket recieved booking request`);
      // setBookings((prevState) => [...prevState, data]);
      Axios.get("http://localhost:3000/api/getAll")
        .then((res) => setBookings(res.data))
        .catch((error) => {
          console.log(error);
        });
      console.log(bookings, data);
    });
  }, [socket]);

  useEffect(() => {
    const makeMinutes = (hours) => {
      return hours * 60;
    };

    const makeHours = (minutes) => {
      return minutes / 60;
    };

    const openHours = (h) => {
      let hours = Array.from({ length: h }, (val, index) => index);
      setHoursOpen(hours);
    };

    setColumns(categories.length);
    setRows(makeMinutes(hoursOpen));
    openHours(7);
  }, []);

  const handleView = () => {
    setView(!view);
  };

  if (!bookings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {view ? (
        <main className="add-bookings">
          <AddBookings
            handleView={handleView}
            categories={categories}
            bookings={bookings}
          />
        </main>
      ) : (
        <main className="view-bookings">
          <div className="time-header">
            <button onClick={handleView}>View</button>
          </div>
          <Header columns={columns} categories={categories} />
          <Time hoursOpen={hoursOpen} rows={rows} />
          <Bookings
            columns={columns}
            categories={categories}
            bookings={bookings}
          />
        </main>
      )}
    </div>
  );
}

export default App;
