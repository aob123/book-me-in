import { useEffect, useState } from "react";
import "./bookings.css";
import Booking from "../booking/Booking";
import { OpenHours } from "../../settings/OpenHours";
import { openHours } from "../../helpers/TimeHelper";
import { colors } from "../../settings/Colors";

const Bookings = ({ categories, bookings, date, socket }) => {
  const [rows, setRows] = useState();
  const [hoursOpen, setHoursOpen] = useState([]);
  const columns = categories.length;

  /*  ---------------------------------------------------------- */

  useEffect(() => {
    const { list } = openHours(OpenHours[date]);
    setHoursOpen(list);
    setRows(list.length * 60);
  }, []);

  /*  ---------------------------------------------------------- */

  return (
    <div className="bookings">
      <div
        className="bookingsGrid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 2fr)`,
        }}
      >
        {categories.map((category, catindex) => (
          <div
            key={catindex}
            className={`gridColumn column-${catindex}`}
            style={{
              gridRow: `1 / ${rows}`,
              gridTemplateRows: `repeat(${rows}, 2fr)`,
            }}
          >
            {bookings.map((booking, index) =>
              booking?.category.name === category.name ? (
                <Booking
                  key={index}
                  booking={booking}
                  hoursOpen={hoursOpen}
                  categories={categories}
                  color={category.color}
                  socket={socket}
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
