/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledAsideItem } from './styledComponents';

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

  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faStopwatch} /> {time}
    </StyledAsideItem>
  );
}

export default Timer;
