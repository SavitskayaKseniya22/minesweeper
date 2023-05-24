import React, { Dispatch, SetStateAction, useState } from 'react';
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

function Cell({
  bombs,
  handleFinishGame,
  nearbyBombs,
  onClick,
}: {
  bombs: number;
  handleFinishGame: Dispatch<SetStateAction<boolean>>;
  nearbyBombs?: number;
  onClick: () => void;
}) {
  const [isPressed, setIsPressed] = useState('false');
  const [isBombed] = useState(Boolean(bombs));

  switch (isPressed) {
    case 'left':
      return isBombed ? (
        <StyledCell aria-details="bomb">
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      ) : (
        <StyledCell aria-details="empty">{nearbyBombs}</StyledCell>
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
            onClick();

            if (isBombed) {
              handleFinishGame(true);
            }
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setIsPressed('right');
            onClick();
          }}
        />
      );
  }
}

Cell.defaultProps = {
  nearbyBombs: 0,
};

export default Cell;
