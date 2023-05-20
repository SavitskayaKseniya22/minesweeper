/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Field from './Field';

function GameBoard() {
  const { state } = useLocation();

  console.log(state);
  return (
    <main>
      <Field difficulty={state.difficulty} />
    </main>
  );
}

export default GameBoard;
