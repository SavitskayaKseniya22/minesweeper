import React, { useState } from 'react';
import styled from 'styled-components';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkColor } from '../utils';

export const StyledCell = styled('li')`
  color: black;
  border: 1px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => checkColor(props['aria-details'])};
`;

function Cell({ bombs }: { bombs: number }) {
  const [isPressed, setIsPressed] = useState('false');
  const [isBombed] = useState(Boolean(bombs));

  switch (isPressed) {
    case 'left':
      return isBombed ? (
        <StyledCell aria-details="bomb">
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      ) : (
        <StyledCell aria-details="empty" />
      );
    case 'right':
      return (
        <StyledCell
          aria-details="question"
          onClick={() => {
            setIsPressed('left');
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setIsPressed('false');
          }}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </StyledCell>
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
