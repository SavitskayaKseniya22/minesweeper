import React, { useEffect, useState } from 'react';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMoveAPI } from './MovesCounter';
import { useBombsApi, useBombsState } from './BombsCounter';
import { StyledCell } from './styledComponents';

function Cell({
  cellSettings,
  handleStartAndFinish,
}: {
  cellSettings: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: string;
  };
  handleStartAndFinish: (e: React.MouseEvent) => void;
}) {
  const [isPressed, setIsPressed] = useState(cellSettings.isOpen);
  const { updateLeftClicksValue, updateRightClicksValue } = useMoveAPI();
  const { increseBombsValue, decreseBombsValue } = useBombsApi();
  const valueOfBombs = useBombsState();

  useEffect(() => {
    setIsPressed(cellSettings.isOpen);
  }, [cellSettings.isOpen]);

  switch (isPressed) {
    case 'left':
      return cellSettings.isBombed ? (
        <StyledCell aria-details="bomb">
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      ) : (
        <StyledCell aria-details="empty">
          {cellSettings.nearbyBombs > 0 ? cellSettings.nearbyBombs : ''}
        </StyledCell>
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
