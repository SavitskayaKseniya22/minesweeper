/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Field from './Field';
import GameCycleContext from '../contexts';
import BombsCounter from './BombsCounter';
import MovesCounter from './MovesCounter';
import Timer from './Timer';
import { PressedCellsDataProvider } from './PressedCells';
import { StyledAsideItemExtended, StyledButton, StyledContainerCentred } from './styledComponents';

function GameBoard() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState<'win' | 'lose' | false>(false);
  const [resetValue, setResetValue] = useState<number>(1);
  const intervalRef = useRef<number | NodeJS.Timeout>(0);
  const navigate = useNavigate();

  const gameCycleValues = useMemo(
    () => ({
      isGameFinished,
      isGameStarted,
      setIsGameStarted,
      setIsGameFinished,
    }),
    [isGameFinished, isGameStarted]
  );

  useEffect(() => {
    if (isGameFinished) {
      clearInterval(intervalRef.current);
    }
  }, [isGameFinished]);

  return (
    <GameCycleContext.Provider value={gameCycleValues}>
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
                    setIsGameStarted(false);
                    setIsGameFinished(false);
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
                    setIsGameStarted(true);
                    setIsGameFinished('lose');
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
      </PressedCellsDataProvider>
    </GameCycleContext.Provider>
  );
}

export default GameBoard;
