import React, { useContext, useEffect, useMemo, useState } from 'react';
import Cell from './Cell';
import {
  clearOfDuplicates,
  getCellsContentList,
  getCellsList,
  getFieldSettings,
  getNearbyBombs,
} from '../utils/utils';
import { GameCycleContext, InitContext } from '../contexts';
import getConnectedRanges from '../utils/funcsToOpenNearbyEmptyCells';
import { StyledField } from './styledComponents';
import { PressedIndexesType } from '../utils/interfaces';
import {
  useLeftClickAPI,
  usePressedCellsState,
  useResetClicksAPI,
  useRightClickAPI,
} from './PressedCells';

function Field({ resetValue }: { resetValue: number }) {
  const [startIndex, setStartIndex] = useState<number | undefined>(undefined);

  const pressedCells: PressedIndexesType = usePressedCellsState();
  const { left, right } = pressedCells;

  const { updateLeftClicks, increaseLeftCounter } = useLeftClickAPI();
  const { updateRightClicks, filterRightClicks, increaseRightCounter } = useRightClickAPI();
  const { resetClicksValues } = useResetClicksAPI();

  const { isGameFinished, isGameStarted, setIsGameFinished, setIsGameStarted } =
    useContext(GameCycleContext);

  const { difficulty, bombNumber } = useContext(InitContext).actionData;

  const fieldSettings = useMemo(() => getFieldSettings(difficulty), [difficulty]);
  const { cellsNumber, width } = fieldSettings;

  const dataToMakeCells = useMemo(
    () => getCellsContentList(isGameStarted, cellsNumber, bombNumber, startIndex),
    [bombNumber, cellsNumber, startIndex, isGameStarted]
  );

  const bombsList = useMemo(
    () =>
      dataToMakeCells.map((elem, i) => {
        if (elem === 0) {
          return getNearbyBombs(i, dataToMakeCells, width);
        }
        return 100;
      }),
    [dataToMakeCells, width]
  );

  const ranges = useMemo(() => getConnectedRanges(bombsList, width), [bombsList, width]);

  const rawCellsList = useMemo(
    () => getCellsList(dataToMakeCells, bombsList, ranges, pressedCells, width),
    [dataToMakeCells, bombsList, ranges, pressedCells, width]
  );

  useEffect(() => {
    if (!isGameFinished && !isGameStarted) {
      resetClicksValues();
    }
  }, [bombNumber, isGameFinished, isGameStarted, resetClicksValues]);

  const openedCells = useMemo(
    () => clearOfDuplicates(left.clicks.map((elem) => rawCellsList[elem].range).flat()),
    [left.clicks, rawCellsList]
  );

  const openedCellsSize = useMemo(() => openedCells.length, [openedCells.length]);

  useEffect(() => {
    const data = right.clicks.concat(openedCells);
    const dataWithoutDup = clearOfDuplicates(data);
    if (data.length !== dataWithoutDup.length) {
      filterRightClicks(openedCells);
    }
  }, [filterRightClicks, openedCells, right.clicks]);

  useEffect(() => {
    if (openedCellsSize + Number(bombNumber) === cellsNumber) {
      setIsGameFinished('win');
    }
  }, [bombNumber, cellsNumber, openedCellsSize, setIsGameFinished]);

  const cellsList = useMemo(
    () =>
      rawCellsList.map((item, index) => (
        <Cell
          key={index.toString() + resetValue}
          handleStartAndFinishGame={() => {
            if (!isGameStarted) {
              setStartIndex(index);
              setIsGameStarted(true);
            }
            if (isGameStarted && item.isBombed) {
              setIsGameFinished('lose');
            }
          }}
          handlePressedIndex={(button: 'left' | 'rightAdd' | 'rightDel') => {
            if (button === 'left') {
              updateLeftClicks(index);
              increaseLeftCounter();
              if (item.isBombed) {
                updateRightClicks(index);
              }
            } else if (button === 'rightAdd') {
              if (Number(bombNumber) - right.clicks.length > 0) {
                updateRightClicks(index);
                increaseRightCounter();
              }
            } else if (button === 'rightDel') {
              filterRightClicks([index]);
              increaseRightCounter();
            }
          }}
          cellSettings={item}
        />
      )),
    [
      bombNumber,
      filterRightClicks,
      increaseLeftCounter,
      increaseRightCounter,
      isGameStarted,
      right.clicks.length,
      rawCellsList,
      resetValue,
      setIsGameFinished,
      setIsGameStarted,
      updateLeftClicks,
      updateRightClicks,
    ]
  );

  return (
    <StyledField aria-busy={Boolean(isGameFinished)} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
