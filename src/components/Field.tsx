import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { checkGridSize, checkSize } from '../utils';

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
  console.log(bombNumber);
  const numberOfCells = {
    easy: 100,
    medium: 225,
    hard: 625,
  };
  const arrayOfNumbers = new Array(numberOfCells[difficulty as keyof typeof numberOfCells]).fill(1);
  const listItems = arrayOfNumbers.map((number, index) => (
    <Cell key={number.toString() + index.toString()} />
  ));

  return <StyledField aria-details={difficulty}>{listItems}</StyledField>;
}

export default Field;
