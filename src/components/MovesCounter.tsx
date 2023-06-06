import React from 'react';
import { usePressedCellsState } from './PressedCells';

function MovesCounter() {
  const { left, right } = usePressedCellsState();
  return (
    <div>
      Left clicks made: {left.counter}
      <br />
      Right clicks made: {right.counter}
    </div>
  );
}

const MovesCounterMemo = React.memo(MovesCounter);

export default MovesCounterMemo;
