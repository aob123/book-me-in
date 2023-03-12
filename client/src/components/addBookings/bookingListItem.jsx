import React from "react";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";

const bookingListItem = ({ booking, deleteBooking }) => {
  //Format time
  let start = dayjs()
    .set("hour", booking.start.hour)
    .set("minute", booking.start.min);
  let end = dayjs()
    .set("hour", booking.end.hour)
    .set("minute", booking.end.min);

  return (
    <div className="bookingRow">
      <p>{booking.name}</p>
      <p>{booking.category.name}</p>
      <p>{start.format("HH:mm")}</p>
      <p>{end.format("HH:mm")}</p>

      <Button>Edit</Button>
      <Button value={booking._id} onClick={() => deleteBooking(booking._id)}>
        Delete
      </Button>
    </div>
  );
};

export default bookingListItem;
