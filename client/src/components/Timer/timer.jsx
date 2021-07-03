import React, { useState, useEffect } from "react";
let time = 0;
let second;
const convertToString = (date) => {
  let date1;
  if (date >= 60) {
    console.log(date);
    date1 = date - Math.floor(date / 60) * 60;
    second = `0${date1}`.slice(-2);
  } else {
    second = `0${date}`.slice(-2);
  }

  const minutes = `0${Math.floor(date / 60)}`.slice(-2);
  //   const minutes = `0${second / 60}`;
  return `${minutes}:${second}`;
};
function Timer(props) {
  const [timeString, setTimeString] = useState("00:00");
  const [clockShow] = useState(true);
  useEffect(() => {
    const clockInterval = setInterval(() => {
      ++time;
      setTimeString(convertToString(time));
    }, 1000);
    return () => {
      clearInterval(clockInterval);
    };
  }, []);
  return <div>{clockShow && timeString}</div>;
}

export default Timer;
