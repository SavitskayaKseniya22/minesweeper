import React, { useContext } from 'react';

import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePressedCellsState } from './PressedCells';
import { InitContext } from '../contexts';
import { StyledAsideItem } from './styledComponents';

function BombsCounter() {
  const { bombNumber } = useContext(InitContext).actionData;
  const { right } = usePressedCellsState();
  return (
    <StyledAsideItem>
      <FontAwesomeIcon icon={faBomb} /> {Number(bombNumber) - right.clicks.length}
    </StyledAsideItem>
  );
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
