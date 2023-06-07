import React, { useContext, useEffect, useMemo } from 'react';
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
  useExtremeClicksAPI,
  useLeftClickAPI,
  usePressedCellsState,
  useResetClicksAPI,
  useRightClickAPI,
} from './PressedCells';

function Field({ resetValue }: { resetValue: number }) {
  const pressedCells: PressedIndexesType = usePressedCellsState();
  const { left, right, startIndex, endIndex } = pressedCells;

  const { updateLeftClicks, increaseLeftCounter } = useLeftClickAPI();
  const { updateRightClicks, filterRightClicks, increaseRightCounter } = useRightClickAPI();
  const { resetClicksValues, setClicksValues } = useResetClicksAPI();
  const { setStartIndex, setEndIndex } = useExtremeClicksAPI();

  const { isGameFinished, isGameStarted, setIsGameFinished, setIsGameStarted } =
    useContext(GameCycleContext);

  const { difficulty, bombNumber } = useContext(InitContext).actionData;

  const fieldSettings = useMemo(() => getFieldSettings(difficulty), [difficulty]);
  const { cellsNumber, width } = fieldSettings;

  const dataToMakeCells = useMemo(
    () => getCellsContentList(isGameStarted, cellsNumber, bombNumber, startIndex),
    [bombNumber, cellsNumber, isGameStarted, startIndex]
  );

  const freeCells = useMemo(
    () =>
      dataToMakeCells
        .map((elem, index) => {
          if (elem !== 1) {
            return index;
          }
          return 1000;
        })
        .filter((elem) => elem !== 1000),
    [dataToMakeCells]
  );

  const bombedCells = useMemo(
    () =>
      dataToMakeCells
        .map((elem, index) => {
          if (elem === 1) {
            return index;
          }
          return 1000;
        })
        .filter((elem) => elem !== 1000),
    [dataToMakeCells]
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
    () =>
      getCellsList(
        dataToMakeCells,
        bombsList,
        ranges,
        pressedCells,
        width,
        endIndex,
        isGameFinished
      ),
    [bombsList, dataToMakeCells, pressedCells, ranges, width, endIndex, isGameFinished]
  );

  useEffect(() => {
    if (!isGameFinished && !isGameStarted) {
      resetClicksValues();
    }
  }, [isGameFinished, isGameStarted, resetClicksValues]);

  useEffect(() => {
    if (isGameFinished && isGameStarted) {
      setClicksValues(freeCells, bombedCells);
    }
  }, [bombedCells, freeCells, isGameFinished, isGameStarted, setClicksValues]);

  const openedCells = useMemo(
    () =>
      clearOfDuplicates(
        left.clicks
          .map((elem) => rawCellsList[elem].range)
          .flat()
          .sort((a, b) => a - b)
      ),
    [left.clicks, rawCellsList]
  );

  useEffect(() => {
    const data = right.clicks.concat(openedCells);
    const dataWithoutDup = clearOfDuplicates(data);
    if (data.length !== dataWithoutDup.length) {
      filterRightClicks(openedCells);
    }
  }, [filterRightClicks, openedCells, right.clicks]);

  useEffect(() => {
    if (
      JSON.stringify(openedCells) === JSON.stringify(freeCells) &&
      isGameStarted &&
      !isGameFinished
    ) {
      setIsGameFinished('win');
    }
  }, [freeCells, isGameFinished, isGameStarted, openedCells, setIsGameFinished]);

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
              setEndIndex(index);
              setIsGameFinished('lose');
            }
          }}
          handlePressedIndex={(button: 'left' | 'rightAdd' | 'rightDel') => {
            if (button === 'left') {
              updateLeftClicks([index]);
              increaseLeftCounter();
              if (item.isBombed) {
                updateRightClicks([index]);
              }
            } else if (button === 'rightAdd') {
              if (right.clicks.length < Number(bombNumber)) {
                updateRightClicks([index]);
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
      rawCellsList,
      resetValue,
      right.clicks.length,
      setEndIndex,
      setIsGameFinished,
      setIsGameStarted,
      setStartIndex,
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
