import "./time.css";
import { useState, useEffect } from "react";
import TimeHelper, {
  makeMarkers,
  makeScale,
  openHours,
} from "../../helpers/TimeHelper";
import { OpenHours } from "../../settings/OpenHours";
import { makeRows } from "../../helpers/TimeToGridHelper";
import dayjs from "dayjs";

const Time = () => {
  const [scale, setScale] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [time, setTime] = useState({});
  const [hoursOpen, setHoursOpen] = useState([]);
  const { hours, minutes, seconds } = TimeHelper();
  const [rows, setRows] = useState(0);
  /*  ---------------------------------------------------------- */

  const testDate = new Date();
  // console.log(dayjs(testDate).minute());

  useEffect(() => {
    const h = openHours(OpenHours[5]).list;
    setHoursOpen(h);
    setRows(h.length * 60);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setTime({ hours, minutes, seconds }),
      60000
    );
    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);
  /*  ---------------------------------------------------------- */

  //Generates the scale of numbers and markers (based on opening hours)
  useEffect(() => {
    let scale = makeScale(hoursOpen);
    let markers = makeMarkers(hoursOpen);

    setScale(scale);
    setMarkers(markers);
  }, [hoursOpen]);
  /*  ---------------------------------------------------------- */

  //Generates the grid rows for hours and minutes within the scale
  const rowsForHours = [1];
  const rowsForMinutes = [1];

  makeRows(60, rowsForHours, hoursOpen.length);
  makeRows(30, rowsForMinutes, hoursOpen.length * 2);

  /*  ---------------------------------------------------------- */

  // console.log(rows);

  return (
    <div className="time">
      <div
        className="timeGrid"
        style={{
          gridTemplateRows: `repeat(${rows}, 2fr)`,
        }}
      >
        <div className="time-scale" style={{ gridRow: `1 / ${rows}` }}>
          {scale.map((number, index) => (
            <p
              key={index}
              style={{
                gridRow: `${rowsForHours[index]} / ${rowsForHours[index + 1]}`,
              }}
            >
              {number}
            </p>
          ))}
        </div>
        <div className="time-markers" style={{ gridRow: `1 / ${rows}` }}>
          {markers.map((minute, index) => (
            <p
              key={index}
              className="time-marker"
              style={{
                gridRow: `${rowsForMinutes[index]} / ${
                  rowsForMinutes[index + 1]
                }`,
              }}
            >
              {/* {minute} */}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Time;
