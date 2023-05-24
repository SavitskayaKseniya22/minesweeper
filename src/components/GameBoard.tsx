/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Navigate, useActionData } from 'react-router-dom';
import Field from './Field';
import { GameContext } from './MainPage';

function GameBoard() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [reset, setReset] = useState<boolean>(false);

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
                setReset(true);
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
          reset={reset}
          setReset={setReset}
        />
      </main>
    </GameContext.Provider>
  );
}

export default GameBoard;
