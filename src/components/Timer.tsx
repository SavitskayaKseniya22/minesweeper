/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';

function Timer({
  intervalRef,
  resetValue,
}: {
  intervalRef: React.MutableRefObject<number | NodeJS.Timeout> | undefined;
  resetValue: number;
}) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    if (intervalRef) {
      intervalRef.current = intervalId;
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalRef, time]);

  useEffect(() => {
    setTime(0);
  }, [resetValue]);

  return <div>{time}</div>;
}

export default Timer;
