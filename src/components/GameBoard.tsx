/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import { Navigate, useActionData } from 'react-router-dom';
import Field from './Field';
import { InitContext, GameCycleContext, RemainingBombsContext } from '../contexts';
import BombsCounter from './BombsCounter';

function GameBoard() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [resetValue, setResetValue] = useState<number>(1);
  const actionData = useActionData() as { difficulty: string; bombNumber: string };
  const [bombsCounterValue, setBombsCounterValue] = useState(Number(actionData?.bombNumber) || 10);

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

  if (!actionData) {
    return <Navigate to="/" />;
  }

  return (
    <InitContext.Provider value={actionData}>
      <GameCycleContext.Provider value={gameCycleValues}>
        <RemainingBombsContext.Provider value={bombsCounterValues}>
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
                  }}
                >
                  start new game
                </button>
              </>
            )}
            <BombsCounter maxValue={bombsCounterValue} />

            <Field resetValue={resetValue} />
          </main>
        </RemainingBombsContext.Provider>
      </GameCycleContext.Provider>
    </InitContext.Provider>
  );
}

export default GameBoard;
