import React, { useContext, useEffect } from 'react';
import { TimeContext } from '../contexts';

function Timer() {
  const { time, setTime, intervalRef } = useContext(TimeContext);

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
  }, [intervalRef, setTime, time]);

  return <div>{time}</div>;
}

export default Timer;
