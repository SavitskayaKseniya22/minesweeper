import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { checkGridSize, checkSize, getCellsList, getNearbyBombs, updateCellsList } from '../utils';
import { GameContext } from './MainPage';

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
  setIsGameFinished,
  isGameFinished,
  setIsGameStarted,
  isGameStarted,
  reset,
  setReset,
}: {
  setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
  isGameFinished: boolean;
  isGameStarted: boolean;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [listItems, setListItems] = useState<number[] | undefined>(undefined);
  const [indexToInsert, setIndexToInsert] = useState<number | undefined>(undefined);

  const { difficulty, bombNumber } = useContext(GameContext);

  useEffect(() => {
    if (isGameStarted) {
      setListItems(updateCellsList(getCellsList(true, difficulty, bombNumber), indexToInsert));
    } else {
      setListItems(getCellsList(false, difficulty, bombNumber));
    }
  }, [bombNumber, difficulty, indexToInsert, isGameStarted]);

  return (
    <StyledField aria-busy={isGameFinished} aria-details={difficulty}>
      {listItems &&
        listItems.map((number, index) => (
          <Cell
            onClick={() => {
              if (!isGameStarted) {
                setIndexToInsert(index);
                setIsGameStarted(true);
                setReset(false);
              }
            }}
            key={number.toString() + index.toString()}
            bombs={listItems[index]}
            handleFinishGame={setIsGameFinished}
            nearbyBombs={isGameStarted ? getNearbyBombs(index, listItems, difficulty as string) : 0}
            reset={reset}
          />
        ))}
    </StyledField>
  );
}

export default Field;
