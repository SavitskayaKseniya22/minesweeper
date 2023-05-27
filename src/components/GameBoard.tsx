/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useActionData } from 'react-router-dom';
import Field from './Field';
import { InitContext, GameCycleContext } from '../contexts';
import BombsCounter, { BombsCounterDataProvider } from './BombsCounter';
import MovesCounter, { MovesCounterDataProvider } from './MovesCounter';
import Timer from './Timer';

function GameBoard() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
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

  // const { resetClicksValue } = useMoveState();
  // const { resetBombsValue } = useBombsState();

  if (!actionData) {
    return <Navigate to="/" />;
  }

  return (
    <InitContext.Provider value={actionDataValues}>
      <GameCycleContext.Provider value={gameCycleValues}>
        <BombsCounterDataProvider>
          <MovesCounterDataProvider>
            <main>
              {isGameFinished && (
                <>
                  <span>game over</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsGameStarted(false);
                      setIsGameFinished(false);
                      setResetValue(Math.random());
                      // resetBombsValue();
                      // resetClicksValue();
                    }}
                  >
                    start new game
                  </button>
                </>
              )}
              <BombsCounter />
              <MovesCounter />
              <Timer intervalRef={intervalRef} resetValue={resetValue} />
              <Field resetValue={resetValue} />
            </main>
          </MovesCounterDataProvider>
        </BombsCounterDataProvider>
      </GameCycleContext.Provider>
    </InitContext.Provider>
  );
}

export default GameBoard;
