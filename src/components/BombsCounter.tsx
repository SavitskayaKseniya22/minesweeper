import React from 'react';

import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { usePressedCellsState } from './PressedCells';

import { StyledAsideItem } from './styledComponents';
import { RootState } from '../store/store';

function BombsCounter() {
  const initFormValues = useSelector((state: RootState) => state.formData.settings);
  const { bombNumber } = initFormValues;
  const { right } = usePressedCellsState();
  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faBomb} /> {Number(bombNumber) - right.clicks.length}
    </StyledAsideItem>
  );
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
