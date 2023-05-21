import React, { useEffect, useState } from 'react';
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

function getCellsList(trigger: boolean, difficulty: string, bombNumber: number) {
  const fieldSettings = {
    easy: { bombNumber: 100, widthOfField: 10 },
    medium: { bombNumber: 225, widthOfField: 15 },
    hard: { bombNumber: 625, widthOfField: 25 },
  };

  const arrayOfBombs = new Array(Number(bombNumber)).fill(1);
  const arrayOfEmptyCells = new Array(
    fieldSettings[difficulty as keyof typeof fieldSettings].bombNumber
  ).fill(0);

  const gameSetup = shuffle(
    arrayOfBombs.concat(arrayOfEmptyCells).slice(0, arrayOfEmptyCells.length)
  );

  return trigger ? gameSetup : arrayOfEmptyCells;
}

function updateCellsList(listItems: number[], indexToInsert: number | undefined) {
  if (indexToInsert !== undefined) {
    listItems.splice(indexToInsert as number, 0, 0);
    const indexToDelete = listItems.indexOf(0, indexToInsert as number);
    listItems.splice(indexToDelete + 1, 1);
  }

  return listItems;
}

function Field({ difficulty, bombNumber }: { difficulty: string; bombNumber: number }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [listItems, setListItems] = useState<number[]>(getCellsList(false, difficulty, bombNumber));
  const [indexToInsert, setIndexToInsert] = useState<undefined | number>(undefined);

  useEffect(() => {
    if (isGameStarted) {
      setListItems(updateCellsList(getCellsList(true, difficulty, bombNumber), indexToInsert));
    }
  }, [bombNumber, difficulty, indexToInsert, isGameStarted]);

  return (
    <StyledField aria-details={difficulty}>
      {listItems.map((number, index) => (
        <Cell
          key={number.toString() + index.toString()}
          bombs={listItems[index]}
          index={index}
          handleStartGame={!isGameStarted ? setIsGameStarted : undefined}
          handleStartPosition={!isGameStarted ? setIndexToInsert : undefined}
        />
      ))}
    </StyledField>
  );
}

export default Field;
