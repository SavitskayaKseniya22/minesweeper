/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Field from './lib/Field';
import BombsCounter from './lib/BombsCounter';
import MovesCounter from './lib/MovesCounter';
import Stopwatch from './lib/Stopwatch';
import {
  StyledAsideItemExtended,
  StyledButtonWide,
  StyledContainerCentred,
} from '../../components/styledComponents';
import { RootState } from '../../store/store';
import { resetGameCycle, updateFinishGameStatus } from '../../store/GameCycleSlice';
import { resetGameData } from '../../store/GameDataSlice';
import { resetStopwatch } from '../../store/StopwatchSlice';

function GameBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished, isItRecord } = gameCycleValues;

  return (
    <main>
      <StyledContainerCentred>
        <Field />
        <aside>
          <BombsCounter />
          <MovesCounter />
          <Stopwatch />

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
