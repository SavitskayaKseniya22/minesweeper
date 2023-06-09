import React from 'react';
import { faComputerMouse, faL, faR } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector } from 'react-redux';
import { StyledAsideItem } from './styledComponents';
import { RootState } from '../store/persistStore';

function MovesCounter() {
  const pressedCellsValues = useSelector((state: RootState) => state.pressedCells);
  const { left, right } = pressedCellsValues;

  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faComputerMouse} /> <FontAwesomeIcon icon={faL} /> {left.counter}{' '}
      <FontAwesomeIcon icon={faR} /> {right.counter}
    </StyledAsideItem>
  );
}

const MovesCounterMemo = React.memo(MovesCounter);

export default MovesCounterMemo;
