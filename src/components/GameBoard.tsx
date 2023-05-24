/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Navigate, useActionData } from 'react-router-dom';
import Field from './Field';
import { GameContext } from './MainPage';

function GameBoard() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [resetValue, setResetValue] = useState<number>(1);

  const actionData = useActionData() as { difficulty: string; bombNumber: string };
  if (!actionData) {
    return <Navigate to="/" />;
  }

  return (
    <GameContext.Provider value={actionData}>
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
          isGameFinished={isGameFinished}
          isGameStarted={isGameStarted}
          setIsGameStarted={setIsGameStarted}
          resetValue={resetValue}
        />
      </main>
    </GameContext.Provider>
  );
}

export default GameBoard;
