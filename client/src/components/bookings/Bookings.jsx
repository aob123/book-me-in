import { useEffect, useState } from "react";
import "./bookings.css";
import Booking from "../booking/Booking";
import { OpenHours } from "../../settings/OpenHours";
import TimeHelper, { openHours } from "../../helpers/TimeHelper";
import { colors } from "../../settings/Colors";
import dayjs from "dayjs";

const Bookings = ({ categories, bookings, date }) => {
  const [rows, setRows] = useState();
  const [hoursOpen, setHoursOpen] = useState([]);
  const columns = categories.length;
  // const { date } = TimeHelper();

  // console.log("BOOOOOKKKKKIIIIINGS", bookings);

  /*  ---------------------------------------------------------- */

  //Set rows dependent on opening hours
  useEffect(() => {
    const { list } = openHours(OpenHours[date]);

    // const { list } = openHours(OpenHours[5]);
    // console.log("HBOOKINGS", list);
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
            {/* <div className="bookingDiv"> */}
            {bookings.map((booking, index) =>
              booking?.category.name === category.name ? (
                <Booking
                  key={index}
                  booking={booking}
                  hoursOpen={hoursOpen}
                  categories={categories}
                  color={colors[catindex]}
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
