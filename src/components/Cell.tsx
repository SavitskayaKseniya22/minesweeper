import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkColor } from '../utils';
import { MovesContext, RemainingBombsContext } from '../contexts';

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
  isBombed,
  nearbyBombs,
  handleStartAndFinish,
}: {
  isBombed: boolean;
  nearbyBombs: number;
  handleStartAndFinish: (e: React.MouseEvent) => void;
}) {
  const [isPressed, setIsPressed] = useState('false');
  const { bombsCounterValue, setBombsCounterValue } = useContext(RemainingBombsContext);
  const { movesCounterValue, setMovesCounterValue } = useContext(MovesContext);

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
            setMovesCounterValue({
              ...movesCounterValue,
              left: movesCounterValue.left + 1,
            });
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setIsPressed('false');
            setBombsCounterValue(bombsCounterValue + 1);
            setMovesCounterValue({
              ...movesCounterValue,
              right: movesCounterValue.right + 1,
            });
          }}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </StyledCell>
      );
    default:
      return (
        <StyledCell
          onClick={(e) => {
            setIsPressed('left');
            handleStartAndFinish(e);
            setMovesCounterValue({
              ...movesCounterValue,
              left: movesCounterValue.left + 1,
            });
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsPressed('right');
            handleStartAndFinish(e);
            setBombsCounterValue(bombsCounterValue - 1);
            setMovesCounterValue({
              ...movesCounterValue,
              right: movesCounterValue.right + 1,
            });
          }}
        />
      );
  }
}

export default Cell;
