import React, { useState, useEffect } from "react";
import Axios from "axios";
import dayjs from "dayjs";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const AddBookings = ({ handleView, categories, bookings }) => {
  const [booking, setBooking] = useState({
    name: undefined,
    category: {},
    start: {},
    end: {},
  });

  //Handlers for inputs
  const handleName = (e) => {
    // setName(e.target.value);
    setBooking({ ...booking, name: e.target.value });
  };

  //Category handler
  const handleCategory = (e) => {
    for (let cat of categories) {
      if (e.target.value === cat.name) {
        setBooking({ ...booking, category: cat });
      }
    }
  };

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

  //Submit handler
  const handleAddBooking = (e) => {
    e.preventDefault();

    //Validate time
    let h = booking.start.hour;
    let m = booking.start.min;

    let timeCheck = dayjs().set("hour", h).set("minute", m);

    if (!timeCheck.isValid()) {
      alert("Please enter a start time");
    } else if (booking.name === undefined) {
      alert("Please enter name");
    } else if (booking.category.name === undefined) {
      alert("Please choose a category");
    } else {
      //Validate booking
      if (bookings.includes(booking)) {
        alert("Already booked");
      }

      //POST to DB
      Axios.post("http://localhost:3000/api/post", {
        name: booking.name,
        category: {
          name: booking.category.name,
          duration: booking.category.duration,
        },
        start: {
          hour: booking.start.hour,
          min: booking.start.min,
        },
        end: {
          hour: booking.end.hour,
          min: booking.end.min,
        },
      })
        .then((error) => {
          console.log("ERROR", error);
        })
        .finally(() => {
          console.log("booking added");

          socket.emit("add_booking", {
            name: booking.name,
            category: {
              name: booking.category.name,
              duration: booking.category.duration,
            },
            start: {
              hour: booking.start.hour,
              min: booking.start.min,
            },
            end: { hour: booking.end.hour, min: booking.end.min },
          });
        });
    }
  };

  return (
    <>
      <section>
        AddBookings
        <button onClick={handleView}>View</button>
      </section>
      <section>
        <form action="submit">
          <label>
            Name:
            <input
              id="name"
              type="text"
              onChange={handleName}
              value={booking.name}
            />
          </label>
          <hr />
          <label>
            Category
            <select value={booking?.category?.name} onChange={handleCategory}>
              <option>Choose category...</option>
              {categories.map((category, index) => (
                <option key={index}>{category.name} </option>
              ))}
            </select>
          </label>
          <label>
            Time
            <input
              onChange={handleTime}
              type="time"
              name="time"
              id="time"
              // value={""}
            />
          </label>
          <hr />
        </form>
        <button type="submit" onClick={handleAddBooking}>
          Add booking
        </button>
      </section>
    </>
  );
};

export default AddBookings;
