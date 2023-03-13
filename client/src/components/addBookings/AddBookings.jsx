import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "./addbooking.css";
dayjs.extend(isBetween);
import { Button, Form } from "react-bootstrap";
// import { socket } from "../../socket";
import { io } from "socket.io-client";
const URL = "http://127.0.0.1:3001";
const socket = io(URL);

const AddBookings = ({ categories, bookings }) => {
  const [booking, setBooking] = useState({});

  /*  ---------------------------------------------------------- */

  const addToDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/post",
        booking
      );
      console.log("Added to db");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
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

  /*  ---------------------------------------------------------- */

  //Category handler
  const handleCategory = (e) => {
    for (let cat of categories) {
      if (e.target.value === cat.name) {
        setBooking({ ...booking, category: cat });
      }
    }
  };

  /*  ---------------------------------------------------------- */

  //Time handler
  const handleTime = (e) => {
    let input = e.target.value;
    let split = input.split(":");
    let h = split[0];
    let m = split[1];
    let formattedTime = dayjs()
      .set("hour", h)
      .set("minute", m)
      .set("second", 0);

    let end = formattedTime.add(booking.category.duration, "minute");

    setBooking({
      ...booking,
      start: { hour: formattedTime.hour(), min: formattedTime.minute() },
      end: { hour: end.hour(), min: end.minute() },
    });
  };

  /*  ---------------------------------------------------------- */

  //Submit handler
  const handleAddBooking = (e) => {
    e.preventDefault();

    //Validate time
    let h = booking.start.hour;
    let m = booking.start.min;

    let timeCheck = dayjs().set("hour", h).set("minute", m);
    console.log(timeCheck);

    const validate = () => {
      if (!timeCheck.isValid()) {
        alert("Please enter a start time");
      } else if (booking.name === undefined) {
        alert("Please enter name");
      } else if (booking.category.name === undefined) {
        alert("Please choose a category");
      } else {
        addToDB();
      }
    };

    validate();
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
                type="text"
                placeholder="Enter name"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="formItem">
              <Form.Label className="formLabel">Category</Form.Label>
              <Form.Select
                onChange={handleCategory}
                aria-label="Default select example"
              >
                <option>Choose category...</option>
                {categories.map((category, index) => (
                  <option value={category.name} key={index}>
                    {category.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="formItem">
              <Form.Label className="formLabel">Time</Form.Label>
              <Form.Control onChange={handleTime} type="time" />
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
