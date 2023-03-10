import "./booking.css";
import TimeToGridHelper from "../../helpers/TimeToGridHelper";
import dayjs from "dayjs";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const Booking = ({ booking, hoursOpen, color }) => {
  const { startRow, endRow } = TimeToGridHelper(booking, hoursOpen);

  const deleteBooking = (id) => {
    axios
      .delete(`http://localhost:3000/api/delete/${id}`)
      .then((res) => {
        // setBookings((prevBookings) =>
        //   prevBookings.filter((booking) => booking._id !== id)
        // );
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
    socket.emit("delete_booking", id);
  };
  /*  ---------------------------------------------------------- */
  //Format time
  let start = dayjs()
    .set("hour", booking.start.hour)
    .set("minute", booking.start.min);
  let end = dayjs()
    .set("hour", booking.end.hour)
    .set("minute", booking.end.min);

  /*  ---------------------------------------------------------- */

  return (
    <div
      className={`bookingSlot booking-${booking.category.name}`}
      style={{
        gridRow: `${startRow} / ${endRow}`,
        backgroundColor: `${color}`,
      }}
    >
      <div className="bookingSlotHeader">
        <p>
          {/* {booking.start.hour} : {booking.start.min} */}
          {`${start.format("HH:mm")} - ${end.format("HH:mm")}`}

          {/* {booking.end.hour}: {booking.end.min} */}
        </p>
        <AiOutlineClose
          value={booking._id}
          onClick={() => deleteBooking(booking._id)}
        />
      </div>
      <div className="bookingSlotName">
        <p>{booking?.name}</p>
      </div>
      {/* <div className="bookingSlotTime"></div> */}
    </div>
  );
};

export default Booking;
