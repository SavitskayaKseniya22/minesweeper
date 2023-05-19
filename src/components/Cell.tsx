import React, { useState } from 'react';
import styled from 'styled-components';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledCell = styled('li')`
  color: black;
  border: 1px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const StyledPressedLeftCell = styled(StyledCell)`
  background-color: #9f9f9f;
`;

export const StyledPressedRightCell = styled(StyledCell)`
  background-color: orange;
`;

function Cell() {
  const [isPressed, setIsPressed] = useState('false');

  switch (isPressed) {
    case 'left':
      return (
        <StyledPressedLeftCell
          onClick={() => {
            setIsPressed('false');
          }}
        />
      );
    case 'right':
      return (
        <StyledPressedRightCell
          onClick={() => {
            setIsPressed('false');
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setIsPressed('false');
          }}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </StyledPressedRightCell>
      );
    default:
      return (
        <StyledCell
          onClick={() => {
            setIsPressed('left');
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setIsPressed('right');
          }}
        />
      );
  }
}

export default Cell;
