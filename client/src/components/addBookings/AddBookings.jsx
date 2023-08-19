import { useState, useEffect } from "react";
import { formatTime, calcEndTime } from "../../helpers/TimeHelper";
import { Button, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "./addbooking.css";
const URL = "http://127.0.0.1:3001";
const socket = io(URL);
dayjs.extend(isBetween);

const AddBookings = ({ categories }) => {
  const [time, setTime] = useState("");
  const [booking, setBooking] = useState({
    name: "",
    category: { name: "", duration: undefined },
    start: { hour: undefined, min: undefined },
    end: { hour: undefined, min: undefined },
  });

  /*  ---------------------------------------------------------- */

  //Update state so that correct end time is calculated for the booking
  useEffect(() => {
    calculateTime(
      booking.category.duration,
      booking.start.hour,
      booking.start.min
    );

    console.log("USEEFFECT", booking);
  }, [booking.start, booking.category]);

  //Add the booking to DB
  const addToDB = async (booking) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/post",
        booking
      );
      console.log("Added to db");

      setBooking({
        name: "",
        category: { name: "", duration: undefined },
        start: { hour: undefined, min: undefined },
        end: { hour: undefined, min: undefined },
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(booking);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
    socket.emit("add_booking", booking);
  };

  /*  ---------------------------------------------------------- */
  //Handlers for inputs

  const handleName = (e) => {
    setBooking({ ...booking, name: e.target.value });
  };

  const handleCategory = (e) => {
    //Iterate categories
    for (let item of categories) {
      //For each category, check if the target value mathces the category
      if (e.target.value === item.name) {
        //Set the cateogry
        setBooking({
          ...booking,
          category: { name: item.name, duration: item.duration },
        });
      }
    }
  };

  const handleTime = (e) => {
    let timeString = e.target.value;
    setTime(timeString);
    let { startHour, startMin } = formatTime(timeString);
    setBooking({ ...booking, start: { hour: startHour, min: startMin } });
  };

  /*  ---------------------------------------------------------- */

  const calculateTime = (duration, startHour, startMin) => {
    if (startHour !== undefined && duration !== undefined) {
      let { endHour, endMin } = calcEndTime(duration, startHour, startMin);
      setBooking({ ...booking, end: { hour: endHour, min: endMin } });
    } else {
      console.log("Can not set end time");
    }
  };

  //Submit handler

  const handleAddBooking = (e) => {
    e.preventDefault();

    //Validate all fields have been filled
    if (
      booking.category.duration === undefined ||
      booking.category.name === ""
    ) {
      alert("Please choose category");
    } else if (
      booking.start.hour === undefined ||
      booking.start.min === undefined
    ) {
      alert("Please enter start time");
    } else if (booking.name === "") {
      alert("Please enter name");
    } else {
      addToDB(booking);
      setTime("");
    }
  };
  /*  ---------------------------------------------------------- */

  return (
    <>
      <div className="addBookingSection">
        <h1>Add booking</h1>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <div className="formItem">
              <Form.Label className="formLabel">Name</Form.Label>
              <Form.Control
                onChange={handleName}
                name="name"
                type="text"
                placeholder="Enter name"
                value={booking.name}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="formItem">
              <Form.Label className="formLabel">Category</Form.Label>
              <Form.Select
                onChange={handleCategory}
                value={booking.category.name}
                name="category"
              >
                <option>Choose category...</option>
                {categories.map((category, index) => (
                  <option key={index}>{category.name}</option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="formItem">
              <Form.Label className="formLabel">Time</Form.Label>
              <Form.Control
                onChange={handleTime}
                type="time"
                name="start"
                value={time}
              />
            </div>
          </Form.Group>

          <div className="formButtons">
            <Button onClick={handleAddBooking} variant="primary" type="submit">
              Add booking
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBookings;
