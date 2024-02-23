/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAsideItem } from '../../../components/styledComponents';
import { increaseStopwatchValue } from '../../../store/StopwatchSlice';
import { RootState } from '../../../store/store';

function Stopwatch() {
  const stopwatch = useSelector((state: RootState) => state.stopwatch);
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished } = gameCycleValues;
  const dispatch = useDispatch();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isGameStarted && !isGameFinished) {
      const intervalId = setInterval(() => {
        dispatch(increaseStopwatchValue());
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dispatch, isGameFinished, isGameStarted]);

  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faStopwatch} /> {stopwatch.value}
    </StyledAsideItem>
  );
}

export default Stopwatch;
