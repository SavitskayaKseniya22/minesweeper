/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Field from './Field';

function GameBoard() {
  const { state }: { state: { difficulty: string; bombNumber: number } } = useLocation();
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  if (!state) {
    return <Navigate to="/" />;
  }
  const { difficulty, bombNumber } = state;

  return (
    <main>
      {isGameFinished && (
        <>
          <span>game over</span>
          <button
            type="button"
            onClick={() => {
              setIsGameStarted(false);
              setIsGameFinished(false);
            }}
          >
            start new game
          </button>
        </>
      )}
      <Field
        difficulty={difficulty}
        bombNumber={bombNumber}
        setIsGameFinished={setIsGameFinished}
        isGameFinished={isGameFinished}
        isGameStarted={isGameStarted}
        setIsGameStarted={setIsGameStarted}
      />
    </main>
  );
}

export default GameBoard;
