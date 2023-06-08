/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useActionData } from 'react-router-dom';
import Field from './Field';
import { InitContext, GameCycleContext } from '../contexts';
import BombsCounter from './BombsCounter';
import MovesCounter from './MovesCounter';
import Timer from './Timer';
import { PressedCellsDataProvider } from './PressedCells';
import { StyledAsideItemExtended, StyledButton, StyledContainer } from './styledComponents';

function GameBoard() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState<'win' | 'lose' | false>(false);
  const [resetValue, setResetValue] = useState<number>(1);
  const actionData = useActionData() as { difficulty: string; bombNumber: string };
  const intervalRef = useRef<number | NodeJS.Timeout>(0);

  const actionDataValues = useMemo(
    () => ({
      actionData,
    }),
    [actionData]
  );

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

  if (!actionData) {
    return <Navigate to="/" />;
  }

  return (
    <InitContext.Provider value={actionDataValues}>
      <GameCycleContext.Provider value={gameCycleValues}>
        <PressedCellsDataProvider>
          <main>
            <StyledContainer>
              <Field resetValue={resetValue} />
              <aside>
                <BombsCounter />
                <MovesCounter />
                <Timer intervalRef={intervalRef} resetValue={resetValue} />

                <StyledAsideItemExtended className="gameInfo">
                  {isGameFinished === 'lose' && <span>game over</span>}
                  {isGameFinished === 'win' && <span>game win!</span>}
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
              </aside>
            </StyledContainer>
          </main>
        </PressedCellsDataProvider>
      </GameCycleContext.Provider>
    </InitContext.Provider>
  );
}

export default GameBoard;
