import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { checkGridSize, checkSize, getCellsList, getNearbyBombs, updateCellsList } from '../utils';

export const StyledField = styled.ul`
  margin: 0 auto;
  width: ${(props) => checkSize(props['aria-details'])};
  height: ${(props) => checkSize(props['aria-details'])};
  display: grid;
  grid-template-columns: ${(props) => checkGridSize(props['aria-details'])};
  grid-template-rows: ${(props) => checkGridSize(props['aria-details'])};
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  pointer-events: ${(props) => {
    if (props['aria-busy']) {
      return 'none';
    }
    return 'auto';
  }};
`;

function Field({
  difficulty,
  bombNumber,
  setIsGameFinished,
  isGameFinished,
}: {
  difficulty: string;
  bombNumber: number;
  setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
  isGameFinished: boolean;
}) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [listItems, setListItems] = useState<number[] | undefined>(undefined);
  const [indexToInsert, setIndexToInsert] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isGameStarted) {
      setListItems(updateCellsList(getCellsList(true, difficulty, bombNumber), indexToInsert));
    }
  }, [bombNumber, difficulty, indexToInsert, isGameStarted]);

  useEffect(() => {
    setListItems(getCellsList(false, difficulty, bombNumber));
  }, [bombNumber, difficulty]);

  return (
    <StyledField aria-busy={isGameFinished} aria-details={difficulty}>
      {listItems &&
        listItems.map((number, index) => (
          <Cell
            onClick={() => {
              if (!isGameStarted) {
                setIndexToInsert(index);
                setIsGameStarted(true);
              }
            }}
            key={number.toString() + index.toString()}
            bombs={listItems[index]}
            handleFinishGame={setIsGameFinished}
            nearbyBombs={isGameStarted ? getNearbyBombs(index, listItems, difficulty) : 0}
          />
        ))}
    </StyledField>
  );
}

export default Field;
