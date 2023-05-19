import React, { useState } from 'react';
import styled from 'styled-components';

export const StyledCell = styled('li')`
  color: black;
  border: 1px solid black;
  background-color: white;
`;
export const StyledPressedCell = styled(StyledCell)`
  background-color: #9f9f9f;
`;

function Cell() {
  const [isPressed, setIsPressed] = useState(false);

  return isPressed ? (
    <StyledPressedCell
      onClick={() => {
        setIsPressed(!isPressed);
      }}
    />
  ) : (
    <StyledCell
      onClick={() => {
        setIsPressed(!isPressed);
      }}
    />
  );
}

export default Cell;
