/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Field from './Field';

function GameBoard() {
  const { state }: { state: { difficulty: string; bombNumber: number } } = useLocation();
  const [isGameFinished, setIsGameFinished] = useState(false);
  if (!state) {
    return <Navigate to="/" />;
  }
  const { difficulty, bombNumber } = state;

  return (
    <main>
      {isGameFinished && (
        <>
          <span>game over</span>
          <button type="button">start new game</button>
        </>
      )}
      <Field
        difficulty={difficulty}
        bombNumber={bombNumber}
        setIsGameFinished={setIsGameFinished}
        isGameFinished={isGameFinished}
      />
    </main>
  );
}

export default GameBoard;
