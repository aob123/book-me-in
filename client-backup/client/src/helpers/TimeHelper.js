import dayjs from "dayjs";

export default function TimeHelper() {
  const date = new Date();
  const hours = dayjs(date).hour();
  const minutes = dayjs(date).minute();
  const seconds = dayjs(date).second();

  return { hours, minutes, seconds };
}

//Get list of every open hour (per day) and the amount of open hours.
export const openHours = (day) => {
  const hours = day.close.hour - day.open.hour;
  const hoursList = [];

  for (let i = 0; i <= hours; i++) {
    hoursList.push(day.open.hour + i);
  }

  return {
    length: hours,
    list: hoursList,
  };
};

// Creates markers
export const makeMarkers = (openhours) => {
  const markersArray = [];

  for (let i = 0; i < openhours.length * 2; i++) {
    markersArray.push(i);
  }

  return markersArray;
};

//Create scale
export const makeScale = (openhours) => {
  const scaleArray = [];

  openhours.forEach((element) => {
    scaleArray.push(element);
  });

  return scaleArray;
};
