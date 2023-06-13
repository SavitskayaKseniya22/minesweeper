/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Field from './Field';
import BombsCounter from './BombsCounter';
import MovesCounter from './MovesCounter';
import Timer from './Stopwatch';
import {
  StyledAsideItemExtended,
  StyledButtonWide,
  StyledContainerCentred,
} from './styledComponents';
import { RootState } from '../store/persistStore';
import { resetGameCycle, updateFinishGameStatus } from '../store/GameCycleSlice';
import { resetGameData } from '../store/GameDataSlice';
import { resetStopwatch } from '../store/StopwatchSlice';

function GameBoard() {
  const [resetValue, setResetValue] = useState<number>(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished, isItRecord } = gameCycleValues;

  return (
    <main>
      <StyledContainerCentred>
        <Field resetValue={resetValue} />
        <aside>
          <BombsCounter />
          <MovesCounter />
          <Timer />

          <StyledAsideItemExtended className="gameInfo">
            {isGameFinished === 'lose' && <span>Game over!</span>}
            {isGameFinished === 'win' && <span>Game win!</span>}
            <br />
            {isItRecord && (
              <span>
                New record! <br />
                {isItRecord.place} place!
              </span>
            )}
          </StyledAsideItemExtended>
          {isGameFinished && (
            <StyledButtonWide
              type="button"
              onClick={() => {
                dispatch(resetGameCycle());
                dispatch(resetGameData());
                dispatch(resetStopwatch());
                setResetValue(Math.random());
              }}
            >
              start new game
            </StyledButtonWide>
          )}
          {isGameStarted && !isGameFinished && (
            <StyledButtonWide
              type="button"
              onClick={() => {
                dispatch(updateFinishGameStatus('lose'));
              }}
            >
              finish game
            </StyledButtonWide>
          )}
          <StyledButtonWide
            type="button"
            onClick={() => {
              navigate('/');
            }}
          >
            Back to level selection
          </StyledButtonWide>
        </aside>
      </StyledContainerCentred>
    </main>
  );
}

export default GameBoard;
