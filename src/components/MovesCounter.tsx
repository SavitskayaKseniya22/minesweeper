import React from 'react';

function MovesCounter({ value }: { value: { left: number; right: number } }) {
  return (
    <div>
      Left clicks made: {value.left}
      <br />
      Right clicks made: {value.right}
    </div>
  );
}

export default MovesCounter;
