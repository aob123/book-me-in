import { useEffect, useState } from "react";
import "./bookings.css";
import Booking from "../booking/Booking";

import { OpenHours } from "../../settings/OpenHours";
import { openHours } from "../../helpers/TimeHelper";

const Bookings = ({ columns, categories, bookings }) => {
  const [rows, setRows] = useState();
  const [hoursOpen, setHoursOpen] = useState([]);

  useEffect(() => {
    const h = openHours(OpenHours[5]).list;
    setHoursOpen(h);
    setRows(h.length * 60);
  }, []);

  //console.log("BOOKINGS PAGE", bookings);

  return (
    <div className="bookings">
      <div
        className="bookingsGrid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 2fr)`,
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`gridColumn column-${index}`}
            style={{
              gridRow: `1 / ${rows}`,
              gridTemplateRows: `repeat(${rows}, 2fr)`,
            }}
          >
            {/* <div className="bookingDiv"> */}
            {bookings.map((booking, index) =>
              booking.category.name === category.name ? (
                <Booking
                  key={index}
                  booking={booking}
                  hoursOpen={hoursOpen}
                  categories={categories}
                />
              ) : (
                ""
              )
            )}
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
