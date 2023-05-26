import React from 'react';

function BombsCounter({ maxValue }: { maxValue: number }) {
  return <div>Bombs left: {maxValue}</div>;
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
