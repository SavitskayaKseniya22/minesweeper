import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { checkGridSize, checkSize, getCellsList } from '../utils';
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

  const { difficulty, bombNumber } = useContext(InitContext).actionData;

  const listItems = useMemo(
    () => getCellsList(isGameStarted, difficulty, bombNumber, indexToInsert),
    [bombNumber, difficulty, indexToInsert, isGameStarted]
  );

  const cellsList = useMemo(
    () =>
      listItems.map((item, index) => (
        <Cell
          key={item.toString() + index.toString() + resetValue}
          handleStartAndFinish={(e) => {
            if (!isGameStarted) {
              setIndexToInsert(index);
              setIsGameStarted(true);
            }
            if (e.type === 'click' && isGameStarted && item.isBombed) {
              setIsGameFinished(true);
            }
          }}
          cellSettings={item}
        />
      )),
    [isGameStarted, listItems, resetValue, setIsGameFinished, setIsGameStarted]
  );

  return (
    <StyledField aria-busy={isGameFinished} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
