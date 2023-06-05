import React, { useCallback, useEffect, useState } from 'react';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMoveAPI } from './MovesCounter';
import { useBombsApi, useBombsState } from './BombsCounter';
import { StyledCell } from './styledComponents';

function Cell({
  cellSettings,
  handleStartAndFinishGame,
  handlePressedIndex,
}: {
  cellSettings: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: string;
  };
  handleStartAndFinishGame: () => void;
  handlePressedIndex: () => void;
}) {
  const [isPressed, setIsPressed] = useState(cellSettings.isOpen);
  const { increaseLeftClicksValue, increaseRightClicksValue } = useMoveAPI();
  const { increaseBombsValue, decreseBombsValue } = useBombsApi();
  const valueOfBombs = useBombsState();

  useEffect(() => {
    setIsPressed(cellSettings.isOpen);
  }, [cellSettings.isOpen]);

  const handleLeftClick = useCallback(() => {
    setIsPressed('left');
    increaseLeftClicksValue();
    handleStartAndFinishGame();
    handlePressedIndex();
    if (cellSettings.isBombed) {
      decreseBombsValue();
    }
  }, [
    cellSettings.isBombed,
    decreseBombsValue,
    handlePressedIndex,
    handleStartAndFinishGame,
    increaseLeftClicksValue,
  ]);

  const handleRightClickToHold = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      if (valueOfBombs > 0) {
        e.preventDefault();
        setIsPressed('right');
        decreseBombsValue();
        increaseRightClicksValue();
      }
    },
    [decreseBombsValue, increaseRightClicksValue, valueOfBombs]
  );

  const handleRightClickToRelease = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      setIsPressed('false');
      increaseBombsValue();
      increaseRightClicksValue();
    },
    [increaseBombsValue, increaseRightClicksValue]
  );

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
          onClick={handleLeftClick}
          onContextMenu={handleRightClickToRelease}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </StyledCell>
      );
    default:
      return <StyledCell onClick={handleLeftClick} onContextMenu={handleRightClickToHold} />;
  }
}

const CellMemo = React.memo(Cell);

export default CellMemo;
