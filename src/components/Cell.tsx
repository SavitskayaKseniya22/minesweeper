import React, { useState } from 'react';
import styled from 'styled-components';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkColor } from '../utils';

import { useMoveAPI } from './MovesCounter';
import { useBombsApi, useBombsState } from './BombsCounter';

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
  cellSettings,
  handleStartAndFinish,
}: {
  cellSettings: {
    isBombed: boolean;
    nearbyBombs: number;
  };
  handleStartAndFinish: (e: React.MouseEvent) => void;
}) {
  const [isPressed, setIsPressed] = useState('false');
  const { updateLeftClicksValue, updateRightClicksValue } = useMoveAPI();
  const { increseBombsValue, decreseBombsValue } = useBombsApi();
  const valueOfBombs = useBombsState();

  switch (isPressed) {
    case 'left':
      return cellSettings.isBombed ? (
        <StyledCell aria-details="bomb">
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      ) : (
        <StyledCell aria-details="empty">{cellSettings.nearbyBombs}</StyledCell>
      );
    case 'right':
      return (
        <StyledCell
          aria-details="question"
          onClick={() => {
            setIsPressed('left');
            updateLeftClicksValue();
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setIsPressed('false');
            increseBombsValue();
            updateRightClicksValue();
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
            updateLeftClicksValue();
          }}
          onContextMenu={(e) => {
            if (valueOfBombs > 0) {
              e.preventDefault();
              setIsPressed('right');
              handleStartAndFinish(e);
              decreseBombsValue();
              updateRightClicksValue();
            }
          }}
        />
      );
  }
}

const CellMemo = React.memo(Cell);

export default CellMemo;
