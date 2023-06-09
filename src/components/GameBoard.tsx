/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Field from './Field';
import BombsCounter from './BombsCounter';
import MovesCounter from './MovesCounter';
import Timer from './Timer';
import { PressedCellsDataProvider } from './PressedCells';
import { StyledAsideItemExtended, StyledButton, StyledContainerCentred } from './styledComponents';
import { RootState } from '../store/store';
import { updateBothGameStatuses } from '../store/GameCycleSlice';

function GameBoard() {
  const [resetValue, setResetValue] = useState<number>(1);
  const intervalRef = useRef<number | NodeJS.Timeout>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished } = gameCycleValues.settings;

  useEffect(() => {
    if (isGameFinished) {
      clearInterval(intervalRef.current);
    }
  }, [isGameFinished]);

  return (
    <PressedCellsDataProvider>
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
                  dispatch(updateBothGameStatuses({ isGameStarted: false, isGameFinished: false }));
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
                  dispatch(updateBothGameStatuses({ isGameStarted: true, isGameFinished: 'lose' }));
                }}
              >
                finish game
              </StyledButton>
            )}
            <StyledButton
              type="button"
              onClick={() => {
                dispatch(updateBothGameStatuses({ isGameStarted: false, isGameFinished: false })); // ??
                navigate('/');
              }}
            >
              Back to level selection
            </StyledButton>
          </aside>
        </StyledContainerCentred>
      </main>
    </PressedCellsDataProvider>
  );
}

export default GameBoard;
