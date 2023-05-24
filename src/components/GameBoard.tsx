/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import { Navigate, useActionData } from 'react-router-dom';
import Field from './Field';
import { GameCycleContext, InitContext } from './MainPage';

function GameBoard() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [resetValue, setResetValue] = useState<number>(1);

  const gameCycleValues = useMemo(
    () => ({ isGameFinished, isGameStarted }),
    [isGameFinished, isGameStarted]
  );

  const actionData = useActionData() as { difficulty: string; bombNumber: string };
  if (!actionData) {
    return <Navigate to="/" />;
  }

  return (
    <InitContext.Provider value={actionData}>
      <GameCycleContext.Provider value={gameCycleValues}>
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
                }}
              >
                start new game
              </button>
            </>
          )}

          <Field
            setIsGameFinished={setIsGameFinished}
            setIsGameStarted={setIsGameStarted}
            resetValue={resetValue}
          />
        </main>
      </GameCycleContext.Provider>
    </InitContext.Provider>
  );
}

export default GameBoard;
