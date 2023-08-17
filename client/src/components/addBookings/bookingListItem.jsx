import React, { useState } from "react";
import { categories } from "../../settings/Categories";
import { Button, Table } from "react-bootstrap";
import dayjs from "dayjs";

const bookingListItem = ({ booking, deleteBooking }) => {
  let color = "#00000";

  //Format time
  let start = dayjs()
    .set("hour", booking.start.hour)
    .set("minute", booking.start.min);
  let end = dayjs()
    .set("hour", booking.end.hour)
    .set("minute", booking.end.min);

  for (let cat of categories) {
    if (booking.category.name === cat.name) {
      color = cat.color;
    }
  }

  return (
    <tr className="listRow">
      <td style={{ backgroundColor: `${color}` }}></td>
      <td>{booking.name}</td>
      <td>{booking.category.name}</td>
      <td>{start.format("HH:mm")}</td>
      <td>{end.format("HH:mm")}</td>
  

      {/* <Button>Edit</Button> */}
      <td className="listDelete">
        <Button value={booking._id} onClick={() => deleteBooking(booking._id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default bookingListItem;
