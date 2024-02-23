import React, { useCallback } from 'react';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { CellBombStatusType, CellType, ClickType } from '../../../utils/interfaces';
import { checkFontColor, checkBackgroundColor } from '../../../utils/utils';

export const StyledCell = styled('li')<{ 'data-status'?: CellBombStatusType }>`
  color: ${(props) => checkFontColor(props['data-status'])};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => checkBackgroundColor(props['data-status'])};
  font-family: 'Overseer', sans-serif;
  position: relative;

  .cell__icon_additioned {
    position: absolute;
    font-size: 0.6rem;
    bottom: 0.2rem;
    right: 0.2rem;
  }
`;

function Cell({
  cellSettings,
  handleStartAndFinishGame,
  handlePressedIndex,
}: {
  cellSettings: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: CellType;
  };
  handleStartAndFinishGame: () => void;
  handlePressedIndex: (button: ClickType) => void;
}) {
  const handleLeftClick = useCallback(() => {
    handleStartAndFinishGame();
    handlePressedIndex(ClickType.LEFT);
  }, [handlePressedIndex, handleStartAndFinishGame]);

  const handleRightClickToHold = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      handlePressedIndex(ClickType.RIGHTADD);
    },
    [handlePressedIndex]
  );

  const handleRightClickToRelease = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      handlePressedIndex(ClickType.RIGHTDEL);
    },
    [handlePressedIndex]
  );

  switch (cellSettings.isOpen) {
    case CellType['opened-bombed-all']:
      return (
        <StyledCell data-status={CellBombStatusType.OPENED}>
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case CellType['opened-bombed-chosen']:
      return (
        <StyledCell data-status={CellBombStatusType.BOMBED}>
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case CellType['opened-bombed-questioned']:
      return (
        <StyledCell data-status={CellBombStatusType.OPENED}>
          <FontAwesomeIcon icon={faQuestion} />
          <FontAwesomeIcon icon={faBomb} className="cell__icon_additioned" />
        </StyledCell>
      );

    case CellType['opened-free']:
      return (
        <StyledCell
          data-status={
            cellSettings.nearbyBombs > 0 ? CellBombStatusType.OPENED : CellBombStatusType.EMPTY
          }
        >
          {cellSettings.nearbyBombs}
        </StyledCell>
      );

    case CellType.questioned:
      return (
        <StyledCell
          data-status={CellBombStatusType.QUESTIONED}
          onClick={handleLeftClick}
          onContextMenu={handleRightClickToRelease}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </StyledCell>
      );
    default:
      return (
        <StyledCell
          data-status={CellBombStatusType.DEFAULT}
          onClick={handleLeftClick}
          onContextMenu={handleRightClickToHold}
        />
      );
  }
}

const CellMemo = React.memo(Cell);

export default CellMemo;
