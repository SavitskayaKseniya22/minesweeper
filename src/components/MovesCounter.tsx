import React from 'react';
import { faComputerMouse, faL, faR } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePressedCellsState } from './PressedCells';
import { StyledAsideItem } from './styledComponents';

function MovesCounter() {
  const { left, right } = usePressedCellsState();
  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faComputerMouse} /> <FontAwesomeIcon icon={faL} /> {left.counter}{' '}
      <FontAwesomeIcon icon={faR} /> {right.counter}
    </StyledAsideItem>
  );
}

const MovesCounterMemo = React.memo(MovesCounter);

export default MovesCounterMemo;
