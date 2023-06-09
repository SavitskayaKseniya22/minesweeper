import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cell from './Cell';
import {
  clearOfDuplicates,
  getCellsContentList,
  getCellsList,
  getFieldSettings,
  getNearbyBombs,
  sortDataToMakeCells,
} from '../utils/utils';

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
import { RootState } from '../store/store';
import { updateFinishGameStatus, updateStartGameStatus } from '../store/GameCycleSlice';

function Field({ resetValue }: { resetValue: number }) {
  const pressedCells: PressedIndexesType = usePressedCellsState();
  const { left, right, startIndex, endIndex } = pressedCells;

  const { updateLeftClicks, increaseLeftCounter } = useLeftClickAPI();
  const { updateRightClicks, filterRightClicks, increaseRightCounter } = useRightClickAPI();
  const { resetClicksValues, setClicksValues } = useResetClicksAPI();
  const { setStartIndex, setEndIndex } = useExtremeClicksAPI();

  const dispatch = useDispatch();
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished } = gameCycleValues.settings;

  const initFormValues = useSelector((state: RootState) => state.formData);
  const { bombNumber, difficulty } = initFormValues.settings;

  const fieldSettings = useMemo(() => getFieldSettings(difficulty), [difficulty]);
  const { cellsNumber, width } = fieldSettings;

  const dataToMakeCells = useMemo(
    () => getCellsContentList(cellsNumber, bombNumber, startIndex),
    [bombNumber, cellsNumber, startIndex]
  );

  const sortedDataToMakeCells = useMemo(
    () => sortDataToMakeCells(dataToMakeCells),
    [dataToMakeCells]
  );
  const { freeCells, bombedCells } = sortedDataToMakeCells;

  useEffect(() => {
    setClicksValues(freeCells, bombedCells);
  }, [bombedCells, freeCells, setClicksValues]);

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
    if (!isGameFinished) {
      const data = right.clicks.concat(openedCells);
      const dataWithoutDup = clearOfDuplicates(data);
      if (data.length !== dataWithoutDup.length) {
        filterRightClicks(openedCells);
      }
    }
  }, [filterRightClicks, isGameFinished, openedCells, right.clicks]);

  useEffect(() => {
    if (
      JSON.stringify(openedCells) === JSON.stringify(freeCells) &&
      isGameStarted &&
      !isGameFinished
    ) {
      dispatch(updateFinishGameStatus('win'));
    }
  }, [dispatch, freeCells, isGameFinished, isGameStarted, openedCells]);

  const cellsList = useMemo(
    () =>
      rawCellsList.map((item, index) => (
        <Cell
          key={index.toString() + resetValue}
          handleStartAndFinishGame={() => {
            if (!isGameStarted) {
              setStartIndex(index);

              dispatch(updateStartGameStatus(true));
            }
            if (isGameStarted && item.isBombed) {
              setEndIndex(index);
              dispatch(updateFinishGameStatus('lose'));
            }
          }}
          handlePressedIndex={(button: 'left' | 'rightAdd' | 'rightDel') => {
            if (button === 'left') {
              updateLeftClicks([index]);
              increaseLeftCounter();
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
      dispatch,
      filterRightClicks,
      increaseLeftCounter,
      increaseRightCounter,
      isGameStarted,
      rawCellsList,
      resetValue,
      right.clicks.length,
      setEndIndex,
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
