import React from 'react';

import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { StyledAsideItem } from './styledComponents';
import { RootState } from '../store/persistStore';

function BombsCounter() {
  const initFormValues = useSelector((state: RootState) => state.gameSettings.formValues);
  const { bombNumber } = initFormValues;
  const gameDataValues = useSelector((state: RootState) => state.gameData).clicks;
  const { right } = gameDataValues;

  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faBomb} /> {Number(bombNumber) - right.list.length}
    </StyledAsideItem>
  );
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
