import React, { useState, useEffect } from "react";
import {
  formatTime,
  calcEndTime,
  currentDay,
  convertTimeToString,
} from "../../helpers/TimeHelper";
// import BookingListItem from "../addBookings/bookingListItem";
import axios from "axios";
import "./editBooking.css";
import { Button, Form, Table } from "react-bootstrap";
const URL = "http://127.0.0.1:3001";
import { io } from "socket.io-client";

const socket = io(URL);

const EditBooking = ({ bookingId, handleEdit, categories, bookings }) => {
  const [updatedBooking, setUpdatedBooking] = useState({});
  const [time, setTime] = useState("");

  /*  ---------------------------------------------------------- */
  //Filter bookings and get current booking

  let currentBooking = bookings.filter((booking) =>
    booking._id.includes(bookingId)
  );

  useEffect(() => {
    setUpdatedBooking(currentBooking[0]);
  }, [bookings]);

  console.log("CURRENT BOOKING", currentBooking);
  console.log("UPDATED BOOKING", updatedBooking);

  let { timeString } = convertTimeToString(
    currentBooking[0].start.hour,
    currentBooking[0].start.min
  );

  /*  ---------------------------------------------------------- */
  //Calculate time for booking

  useEffect(() => {
    calculateTime(
      updatedBooking.category?.duration,
      updatedBooking.start?.hour,
      updatedBooking.start?.min
    );
  }, [updatedBooking.start, updatedBooking.category]);

  /*  ---------------------------------------------------------- */
  //Update the booking in db and emit to other clients

  const updateBooking = async (updatedBooking) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/update/${bookingId}`,
        updatedBooking
      );
      console.log("UPDATE TO DATABASE");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
    //Emit to client
    socket.emit("add_booking", currentBooking);
    console.log("UDPATEDE BOOKING?", updatedBooking);
    // setUpdatedBooking(currentBooking);
    handleEdit();
  };

  /*  ---------------------------------------------------------- */
  //Handlers for inputs

  //Name
  const handleName = (e) => {
    setUpdatedBooking({ ...updatedBooking, name: e.target.value });
  };

  //Category
  const handleCategory = (e) => {
    //Iterate categories
    for (let item of categories) {
      //For each category, check if the target value mathces the category
      if (e.target.value === item.name) {
        //Set the cateogry
        setUpdatedBooking({
          ...updatedBooking,
          category: { name: item.name, duration: item.duration },
        });
      }
    }
  };

  //Time
  const handleTime = (e) => {
    let timeString = e.target.value;
    setTime(timeString);
    let { startHour, startMin } = formatTime(timeString);

    setUpdatedBooking({
      ...updatedBooking,
      start: { hour: startHour, min: startMin },
    });
  };

  /*  ---------------------------------------------------------- */
  //Calulate time

  const calculateTime = (duration, startHour, startMin) => {
    if (startHour !== undefined && duration !== undefined) {
      let { endHour, endMin } = calcEndTime(duration, startHour, startMin);
      setUpdatedBooking({
        ...updatedBooking,
        end: { hour: endHour, min: endMin },
      });
    } else {
      console.log("Can not set end time");
    }
  };

  /*  ---------------------------------------------------------- */
  const handleUpdateBooking = (e) => {
    e.preventDefault();

    console.log("UPDATED BOOKING AFTER CLICK", updatedBooking);

    //Validate all fields have been filled
    if (
      updatedBooking.category.duration === undefined ||
      updatedBooking.category.name === ""
    ) {
      alert("Please choose category");
    } else if (
      updatedBooking.start.hour === undefined ||
      updatedBooking.start.min === undefined
    ) {
      alert("Please enter a valid start time");
      setUpdatedBooking({
        ...currentBooking[0],
      });
      return;
    } else if (
      //Prevents bookings being made before opening and after closing
      updatedBooking.start.hour < currentDay()[0].open.hour ||
      updatedBooking.start.hour >= currentDay()[0].close.hour
    ) {
      alert(
        `Please enter a time within opening hours - (${
          currentDay()[0].open.hour
        } to ${currentDay()[0].close.hour})`
      );
      setUpdatedBooking({
        ...currentBooking[0],
      });
    } else if (updatedBooking.name === "") {
      alert("Please enter name");
    } else {
      // calculateTime(
      //   updatedBooking.category.duration,
      //   updatedBooking.start.hour,
      //   updatedBooking.start.min
      // );
      updateBooking(updatedBooking);
      setTime("");
    }
  };

  return (
    <div className="editBookingView">
      <div className="editModal">
        <h1>Edit booking</h1>
        <Form onSubmit={handleUpdateBooking}>
          <Form.Group className="mb-3" controlId="name">
            <div className="formItem">
              <Form.Label className="formLabel">Name</Form.Label>
              <Form.Control
                onChange={handleName}
                name="name"
                type="text"
                placeholder="Enter name"
                defaultValue={currentBooking[0].name}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="formItem">
              <Form.Label className="formLabel">Category</Form.Label>
              <Form.Select
                onChange={handleCategory}
                defaultValue={currentBooking[0].category.name}
                name="category"
              >
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
                defaultValue={timeString}
              />
            </div>
          </Form.Group>
          <Button type="submit">Save</Button>
          <Button onClick={() => handleEdit()}>Cancel</Button>
        </Form>
        {/* <Table>
          <tbody>
            <BookingListItem booking={currentBooking[0]} />
          </tbody>
        </Table> */}
      </div>
    </div>
  );
};

export default EditBooking;
