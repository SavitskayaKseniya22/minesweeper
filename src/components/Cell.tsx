import React, { useCallback } from 'react';
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
  handlePressedIndex: (button: 'left' | 'rightAdd' | 'rightDel') => void;
}) {
  const { increaseLeftClicksValue, increaseRightClicksValue } = useMoveAPI();
  const { increaseBombsValue, decreseBombsValue } = useBombsApi();
  const valueOfBombs = useBombsState();

  const handleLeftClick = useCallback(() => {
    increaseLeftClicksValue();
    handleStartAndFinishGame();
    handlePressedIndex('left');
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
        decreseBombsValue();
        increaseRightClicksValue();
        handlePressedIndex('rightAdd');
      }
    },
    [decreseBombsValue, handlePressedIndex, increaseRightClicksValue, valueOfBombs]
  );

  const handleRightClickToRelease = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      increaseBombsValue();
      increaseRightClicksValue();
      handlePressedIndex('rightDel');
    },
    [handlePressedIndex, increaseBombsValue, increaseRightClicksValue]
  );

  switch (cellSettings.isOpen) {
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
