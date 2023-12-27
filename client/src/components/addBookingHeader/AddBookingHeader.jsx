import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./addBookingHeader.css";
import dayjs from "dayjs";

const AddBookingHeader = ({ handleView, date }) => {
  const [clock, setClock] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    setInterval(() => {
      setClock(dayjs().format("HH:mm:ss"));
    }, 1000);
  }, [clock]);

  return (
    <div className="addBookingHeader">
      <Button onClick={handleView}>Back</Button>

      <div className="day">
        <h3>{dayjs().set("day", date).format("dddd")}</h3>
      </div>
      <div className="clock">
        <h3>{clock}</h3>
      </div>
    </div>
  );
};

export default AddBookingHeader;
