import "./time.css";
import { useState, useEffect } from "react";
import { makeMarkers, makeScale, openHours } from "../../helpers/TimeHelper";
import { OpenHours } from "../../settings/OpenHours";
import { makeRows } from "../../helpers/TimeToGridHelper";

const Time = ({ date }) => {
  const [scale, setScale] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [hoursOpen, setHoursOpen] = useState([]);
  const [rows, setRows] = useState(0);

  /*  ---------------------------------------------------------- */

  //Set rows dependent on opening hours
  useEffect(() => {
    const { list } = openHours(OpenHours[date]);
    setHoursOpen(list);
    setRows(list.length * 60);
  }, []);

  /*  ---------------------------------------------------------- */

  //Generates the scale of numbers and markers (based on opening hours)
  useEffect(() => {
    let scale = makeScale(hoursOpen);
    let markers = makeMarkers(hoursOpen);
    setScale(scale);
    setMarkers(markers);
  }, [hoursOpen]);
  /*  ---------------------------------------------------------- */

  //Generates the grid rows for hours and minutes within the scale (minutes, number of intervals) for markers and scale.
  const rowsForHours = makeRows(60, hoursOpen.length);
  const rowsForMinutes = makeRows(30, hoursOpen.length * 2);

  /*  ---------------------------------------------------------- */

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
            ></p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Time;
