import React from 'react';

function BombsCounter({ maxValue }: { maxValue: number }) {
  return <div>Bombs left: {maxValue}</div>;
}

export default BombsCounter;
