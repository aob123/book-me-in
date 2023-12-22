import dayjs from "dayjs";
import { OpenHours } from "../settings/OpenHours";

export default function TimeHelper() {
  const date = dayjs();
  const hours = dayjs().hour();
  const minutes = dayjs().minute();
  const seconds = dayjs().second();

  return { hours, minutes, seconds, date };
}

//Return current day
export const currentDay = () => {
  const day = dayjs().day();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let today = [];

  for (let i = 0; i < days.length; i++) {
    if (i === day) {
      today.push(OpenHours[i]);
      return today;
    } else {
      console.log("Days are not the same");
    }
  }

  return today;
};

//Get list of every open hour (per day) and the amount of open hours.
export const openHours = (day) => {
  const hours = day?.close?.hour - day?.open?.hour;
  const hoursList = [];

  for (let i = 0; i <= hours; i++) {
    hoursList.push(day?.open?.hour + i);
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

//Format time

export const formatTime = (timeString) => {
  let split = timeString.split(":");
  let hour = split[0];
  let minute = split[1];
  let formattedTime = dayjs()
    .set("hour", hour)
    .set("minute", minute)
    .set("second", 0);

  let start = formattedTime;
  let startHour = start.hour();
  let startMin = start.minute();

  return { startHour, startMin };
};

//Calculate end time

export const calcEndTime = (duration, startHour, startMin) => {
  if (
    duration === undefined &&
    startHour === undefined &&
    startMin === undefined
  ) {
    console.log("Not set");
  } else {
    let hour = startHour;
    let minute = startMin;
    let formattedTime = dayjs()
      .set("hour", hour)
      .set("minute", minute)
      .set("second", 0);

    console.log("START HOUR", startHour, "START MIN", startMin);

    let end = formattedTime.add(duration, "minute");
    let endHour = end.hour();
    let endMin = end.minute();
    console.log("HELPER END", endHour, endMin, end);
    console.log("DURATION", duration);

    return { endHour, endMin };
  }
};
