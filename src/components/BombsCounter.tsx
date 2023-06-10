import React from 'react';

import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { StyledAsideItem } from './styledComponents';
import { RootState } from '../store/persistStore';

function BombsCounter() {
  const initFormValues = useSelector((state: RootState) => state.gameSettings.formValues);
  const { bombNumber } = initFormValues;
  const pressedCellsValues = useSelector((state: RootState) => state.pressedCells);
  const { right } = pressedCellsValues;

  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faBomb} /> {Number(bombNumber) - right.clicks.length}
    </StyledAsideItem>
  );
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
