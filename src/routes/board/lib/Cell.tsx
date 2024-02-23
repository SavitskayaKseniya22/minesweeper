import React, { useCallback } from 'react';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledCell } from '../../../components/styledComponents';

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
    case 'opened-bombed-all':
      return (
        <StyledCell aria-details="opened">
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case 'opened-bombed-chosen':
      return (
        <StyledCell aria-details="bomb">
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case 'opened-bombed-questioned':
      return (
        <StyledCell aria-details="opened">
          <FontAwesomeIcon icon={faQuestion} />
          <FontAwesomeIcon icon={faBomb} className="additionIcon" />
        </StyledCell>
      );

    case 'opened-free':
      return (
        <StyledCell aria-details={cellSettings.nearbyBombs > 0 ? 'opened' : 'empty'}>
          {cellSettings.nearbyBombs}
        </StyledCell>
      );

    case 'questioned':
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
