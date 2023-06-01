import React from 'react';

export default function Timer({ start }) {
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [start]);
  const formatNumberAsTime = (number) => {
    var hours = Math.floor(number / 60);
    var minutes = number % 60;

    var formattedTime =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0');
    return formattedTime;
  };

  return <div>{formatNumberAsTime(time)}</div>;
}
