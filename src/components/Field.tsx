import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { checkGridSize, checkSize, getCellsList, getNearbyBombs } from '../utils';
import { GameCycleContext, InitContext } from '../contexts';

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

function Field({ resetValue }: { resetValue: number }) {
  const [indexToInsert, setIndexToInsert] = useState<number | undefined>(undefined);

  const { isGameFinished, isGameStarted, setIsGameFinished, setIsGameStarted } =
    useContext(GameCycleContext);

  const { difficulty, bombNumber } = useContext(InitContext);

  const listItems = useMemo(
    () => getCellsList(isGameStarted, difficulty, bombNumber, indexToInsert),
    [bombNumber, difficulty, indexToInsert, isGameStarted]
  );

  return (
    <StyledField aria-busy={isGameFinished} aria-details={difficulty}>
      {listItems &&
        listItems.map((number, index) => (
          <Cell
            key={number.toString() + index.toString() + resetValue}
            handleStartAndFinish={(e) => {
              if (!isGameStarted) {
                setIndexToInsert(index);
                setIsGameStarted(true);
              }
              if (e.type === 'click' && isGameStarted && listItems[index]) {
                setIsGameFinished(true);
              }
            }}
            isBombed={!!listItems[index]}
            nearbyBombs={isGameStarted ? getNearbyBombs(index, listItems, difficulty as string) : 0}
          />
        ))}
    </StyledField>
  );
}

export default Field;
