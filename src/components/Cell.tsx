import React, { useCallback } from 'react';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const handleLeftClick = useCallback(() => {
    handleStartAndFinishGame();
    handlePressedIndex('left');
  }, [handlePressedIndex, handleStartAndFinishGame]);

  const handleRightClickToHold = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      handlePressedIndex('rightAdd');
    },
    [handlePressedIndex]
  );

  const handleRightClickToRelease = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      handlePressedIndex('rightDel');
    },
    [handlePressedIndex]
  );

  switch (cellSettings.isOpen) {
    case 'opened':
      return cellSettings.isBombed ? (
        <StyledCell aria-details="opened">
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      ) : (
        <StyledCell aria-details="opened">
          {cellSettings.nearbyBombs > 0 ? cellSettings.nearbyBombs : ''}
        </StyledCell>
      );

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
