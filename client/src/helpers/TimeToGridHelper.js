export default function TimeToGridHelper(booking, openHours) {
  let startRow = 0;
  let endRow = 0;

  for (let i = 0; i < openHours.length; i++) {
    //Check starting hour
    if (booking.start.hour === openHours[i]) {
      if (i === 0) {
        if (booking.start.min > 0) {
          startRow = 1 + booking.start.min;
        } else {
          startRow = 1;
        }
      } else if (i > 0) {
        if (booking.start.min > 0) {
          startRow = i * 60 + booking.start.min;
        } else {
          startRow = i * 60;
        }
      }
    }

    //Check ending hour
    if (booking.end.hour === openHours[i]) {
      if (i === 0) {
        if (booking.end.min > 0) {
          endRow = 1 + booking.end.min;
        } else {
          endRow = 1;
        }
      } else if (i > 0) {
        if (booking.end.min > 0) {
          endRow = i * 60 + booking.end.min;
        } else {
          endRow = i * 60;
        }
      }
    }
  }

  // console.log(booking.category, startRow, endRow);

  return { startRow, endRow };
}

//Create an arrays of rows based on open hours
export const makeRows = (minutes, openhoursArray) => {
  let rowsArray = [0];
  for (let i = 1; i <= openhoursArray; i++) {
    let startRow = minutes * i;
    rowsArray.push(startRow);
  }

  return rowsArray;
};
