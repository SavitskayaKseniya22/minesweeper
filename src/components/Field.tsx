import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { checkGridSize, checkSize, shuffle } from '../utils';

export const StyledField = styled.ul`
  margin: 0 auto;
  width: ${(props) => checkSize(props['aria-details'])};
  height: ${(props) => checkSize(props['aria-details'])};
  display: grid;
  grid-template-columns: ${(props) => checkGridSize(props['aria-details'])};
  grid-template-rows: ${(props) => checkGridSize(props['aria-details'])};
  grid-column-gap: 2px;
  grid-row-gap: 2px;
`;

function Field({ difficulty, bombNumber }: { difficulty: string; bombNumber: number }) {
  const numberOfCells = {
    easy: 100,
    medium: 225,
    hard: 625,
  };

  const arrayOfBombs = new Array(Number(bombNumber)).fill(1);
  const arrayOfNumbers = new Array(numberOfCells[difficulty as keyof typeof numberOfCells]).fill(0);

  const gameSetup = shuffle(arrayOfBombs.concat(arrayOfNumbers).slice(0, arrayOfNumbers.length));

  const listItems = arrayOfNumbers.map((number, index) => (
    <Cell key={number.toString() + index.toString()} bombs={gameSetup[index]} />
  ));

  return <StyledField aria-details={difficulty}>{listItems}</StyledField>;
}

export default Field;
