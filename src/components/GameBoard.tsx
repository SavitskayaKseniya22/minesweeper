/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useActionData } from 'react-router-dom';
import Field from './Field';
import { InitContext, GameCycleContext, RemainingBombsContext, MovesContext } from '../contexts';
import BombsCounter from './BombsCounter';
import MovesCounter from './MovesCounter';
import Timer from './Timer';

function GameBoard() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [resetValue, setResetValue] = useState<number>(1);
  const actionData = useActionData() as { difficulty: string; bombNumber: string };
  const [bombsCounterValue, setBombsCounterValue] = useState(Number(actionData?.bombNumber) || 10);
  const [movesCounterValue, setMovesCounterValue] = useState({ left: 0, right: 0 });

  const intervalRef = useRef<number | NodeJS.Timeout>(0);

  const gameCycleValues = useMemo(
    () => ({
      isGameFinished,
      isGameStarted,
      setIsGameStarted,
      setIsGameFinished,
    }),
    [isGameFinished, isGameStarted]
  );

  const bombsCounterValues = useMemo(
    () => ({
      bombsCounterValue,
      setBombsCounterValue,
    }),
    [bombsCounterValue]
  );

  const movesCounterValues = useMemo(
    () => ({
      movesCounterValue,
      setMovesCounterValue,
    }),
    [movesCounterValue]
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
    <InitContext.Provider value={actionData}>
      <GameCycleContext.Provider value={gameCycleValues}>
        <RemainingBombsContext.Provider value={bombsCounterValues}>
          <MovesContext.Provider value={movesCounterValues}>
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
                      setBombsCounterValue(Number(actionData?.bombNumber) || 10);
                      setMovesCounterValue({ left: 0, right: 0 });
                    }}
                  >
                    start new game
                  </button>
                </>
              )}
              <BombsCounter maxValue={bombsCounterValue} />
              <MovesCounter value={movesCounterValue} />
              <Timer intervalRef={intervalRef} resetValue={resetValue} />
              <Field resetValue={resetValue} />
            </main>
          </MovesContext.Provider>
        </RemainingBombsContext.Provider>
      </GameCycleContext.Provider>
    </InitContext.Provider>
  );
}

export default GameBoard;
