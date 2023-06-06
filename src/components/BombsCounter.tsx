import React, { useContext } from 'react';

import { usePressedCellsState } from './PressedCells';
import { InitContext } from '../contexts';

function BombsCounter() {
  const { bombNumber } = useContext(InitContext).actionData;
  const { right } = usePressedCellsState();
  return <div>Bombs left: {Number(bombNumber) - right.clicks.length}</div>;
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
