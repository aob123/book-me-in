import "./booking.css";
import TimeToGridHelper from "../../helpers/TimeToGridHelper";
import dayjs from "dayjs";

import { useEffect, useState } from "react";

const Booking = ({ booking, hoursOpen, categories }) => {
  const [catID, setCatID] = useState(0);
  const { startRow, endRow } = TimeToGridHelper(
    booking,
    hoursOpen
    // bookingDuration
  );

  let start = dayjs()
    .set("hour", booking.start.hour)
    .set("minute", booking.start.min);
  let end = dayjs()
    .set("hour", booking.end.hour)
    .set("minute", booking.end.min);
  console.log(start);

  useEffect(() => {
    categories.map((category) => {
      if (booking.category.name === category.name) {
        setCatID(category.id);
        // setBookingDuration(category.duration);
      }
    });
  }, [booking]);

  // console.log("THE BOOKING", booking);

  return (
    <div
      className={`booking-slot booking-${booking.category.name}`}
      style={{ gridRow: `${startRow} / ${endRow}` }}
    >
      <p>{booking.name}</p>
      <p>
        {/* {booking.start.hour} : {booking.start.min} */}
        {`${start.format("HH:mm")}`}
      </p>
      <p>
        {/* {booking.end.hour}: {booking.end.min} */}
        {`${end.format("HH:mm")}`}
      </p>
    </div>
  );
};

export default Booking;
