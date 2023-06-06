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
import { useBombsApi } from './BombsCounter';
import { useMoveAPI } from './MovesCounter';
import { PressedIndexesType } from '../utils/interfaces';
import {
  useLeftClickAPI,
  usePressedCellsState,
  useResetClicksAPI,
  useRightClickAPI,
} from './PressedCells';

function Field({ resetValue }: { resetValue: number }) {
  const { resetClicksValue } = useMoveAPI();
  const { resetBombsValue } = useBombsApi();
  const [indexToInsert, setIndexToInsert] = useState<number | undefined>(undefined);

  const pressedIndexes: PressedIndexesType = usePressedCellsState();
  const { updateLeftClicks } = useLeftClickAPI();
  const { updateRightClicks, filterRightClicks } = useRightClickAPI();
  const { resetClicksValues } = useResetClicksAPI();

  const { isGameFinished, isGameStarted, setIsGameFinished, setIsGameStarted } =
    useContext(GameCycleContext);
  const { difficulty, bombNumber } = useContext(InitContext).actionData;

  const fieldSettings = useMemo(() => getFieldSettings(difficulty), [difficulty]);

  const dataToMakeCells = useMemo(
    () => getCellsContentList(isGameStarted, fieldSettings.cellsNumber, bombNumber, indexToInsert),
    [bombNumber, fieldSettings.cellsNumber, indexToInsert, isGameStarted]
  );

  const bombsList = useMemo(
    () =>
      dataToMakeCells.map((elem, i) => {
        if (elem === 0) {
          return getNearbyBombs(i, dataToMakeCells, fieldSettings.width);
        }
        return 100;
      }),
    [dataToMakeCells, fieldSettings.width]
  );

  const ranges = useMemo(
    () => getConnectedRanges(bombsList, fieldSettings.width),
    [bombsList, fieldSettings.width]
  );

  const rawCellsList = useMemo(
    () => getCellsList(dataToMakeCells, bombsList, ranges, pressedIndexes, fieldSettings.width),
    [dataToMakeCells, bombsList, ranges, pressedIndexes, fieldSettings.width]
  );

  useEffect(() => {
    if (!isGameFinished && !isGameStarted) {
      resetClicksValues();
      resetBombsValue(Number(bombNumber));
      resetClicksValue();
    }
  }, [
    bombNumber,
    isGameFinished,
    isGameStarted,
    resetBombsValue,
    resetClicksValue,
    resetClicksValues,
  ]);

  const openedCells = useMemo(
    () =>
      clearOfDuplicates(pressedIndexes.left.clicks.map((elem) => rawCellsList[elem].range).flat()),
    [pressedIndexes, rawCellsList]
  );

  const openedCellsSize = useMemo(() => openedCells.length, [openedCells.length]);

  useEffect(() => {
    if (openedCellsSize + Number(bombNumber) === fieldSettings.cellsNumber) {
      setIsGameFinished('win');
    }
  }, [
    bombNumber,
    fieldSettings.cellsNumber,
    openedCellsSize,
    pressedIndexes,
    rawCellsList,
    setIsGameFinished,
  ]);

  const cellsList = useMemo(
    () =>
      rawCellsList.map((item, index) => (
        <Cell
          key={index.toString() + resetValue}
          handleStartAndFinishGame={() => {
            if (!isGameStarted) {
              setIndexToInsert(index);
              setIsGameStarted(true);
            }
            if (isGameStarted && item.isBombed) {
              setIsGameFinished('lose');
            }
          }}
          handlePressedIndex={(button: 'left' | 'rightAdd' | 'rightDel') => {
            if (button === 'left') {
              updateLeftClicks(index);
            } else if (button === 'rightAdd') {
              updateRightClicks(index);
            } else if (button === 'rightDel') {
              filterRightClicks(index);
            }
          }}
          cellSettings={item}
        />
      )),
    [
      filterRightClicks,
      isGameStarted,
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
