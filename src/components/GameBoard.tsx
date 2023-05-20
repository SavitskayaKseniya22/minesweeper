/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Field from './Field';

function GameBoard() {
  const { state }: { state: { difficulty: string; bombNumber: number } } = useLocation();
  const { difficulty, bombNumber } = state;

  return (
    <main>
      <Field difficulty={difficulty} bombNumber={bombNumber} />
    </main>
  );
}

export default GameBoard;
