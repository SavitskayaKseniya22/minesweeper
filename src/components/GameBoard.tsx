/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Field from './Field';
import BombsCounter from './BombsCounter';
import MovesCounter from './MovesCounter';
import Timer from './Timer';
import { StyledAsideItemExtended, StyledButton, StyledContainerCentred } from './styledComponents';
import { RootState } from '../store/persistStore';
import { resetGameCycle, updateFinishGameStatus } from '../store/GameCycleSlice';
import { resetGameData } from '../store/GameDataSlice';

function GameBoard() {
  const [resetValue, setResetValue] = useState<number>(1);
  const intervalRef = useRef<number | NodeJS.Timeout>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished } = gameCycleValues;

  useEffect(() => {
    if (isGameFinished) {
      clearInterval(intervalRef.current);
    }
  }, [isGameFinished]);

  return (
    <main>
      <StyledContainerCentred>
        <Field resetValue={resetValue} />
        <aside>
          <BombsCounter />
          <MovesCounter />
          <Timer intervalRef={intervalRef} resetValue={resetValue} />

          <StyledAsideItemExtended className="gameInfo">
            {isGameFinished === 'lose' && <span>Game over!</span>}
            {isGameFinished === 'win' && <span>Game win!</span>}
          </StyledAsideItemExtended>
          {isGameFinished && (
            <StyledButton
              type="button"
              onClick={() => {
                dispatch(resetGameCycle());
                dispatch(resetGameData());
                setResetValue(Math.random());
              }}
            >
              start new game
            </StyledButton>
          )}
          {isGameStarted && !isGameFinished && (
            <StyledButton
              type="button"
              onClick={() => {
                dispatch(updateFinishGameStatus('lose'));
              }}
            >
              finish game
            </StyledButton>
          )}
          <StyledButton
            type="button"
            onClick={() => {
              navigate('/');
            }}
          >
            Back to level selection
          </StyledButton>
        </aside>
      </StyledContainerCentred>
    </main>
  );
}

export default GameBoard;
