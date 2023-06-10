import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cell from './Cell';
import {
  clearOfDuplicates,
  getCellsContentList,
  getCellsList,
  getNearbyBombs,
  sortDataToMakeCells,
} from '../utils/utils';

import getConnectedRanges from '../utils/funcsToOpenNearbyEmptyCells';
import { StyledField } from './styledComponents';

import { RootState } from '../store/persistStore';
import { updateFinishGameStatus, updateStartGameStatus } from '../store/GameCycleSlice';
import {
  filterRightClicks,
  increaseLeftCounter,
  increaseRightCounter,
  resetClicksValues,
  setClicksValues,
  setEndIndex,
  setStartIndex,
  updateLeftClicks,
  updateRightClicks,
} from '../store/PressedCellsSlice';

function Field({ resetValue }: { resetValue: number }) {
  const dispatch = useDispatch();

  const pressedCellsValues = useSelector((state: RootState) => state.pressedCells);

  const { left, right, startIndex, endIndex } = pressedCellsValues;

  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished } = gameCycleValues.settings;

  const initFormValues = useSelector((state: RootState) => state.gameSettings);
  const { bombNumber, difficulty } = initFormValues.formValues;
  const { cellsNumber, width } = initFormValues.fieldParameters;

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
    dispatch(setClicksValues({ blank: freeCells, bombed: bombedCells }));
  }, [bombedCells, dispatch, freeCells]);

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
        pressedCellsValues,
        width,
        endIndex,
        isGameFinished
      ),
    [dataToMakeCells, bombsList, ranges, pressedCellsValues, width, endIndex, isGameFinished]
  );

  useEffect(() => {
    if (!isGameFinished && !isGameStarted) {
      dispatch(resetClicksValues());
    }
  }, [dispatch, isGameFinished, isGameStarted]);

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
        dispatch(filterRightClicks(openedCells));
      }
    }
  }, [dispatch, isGameFinished, openedCells, right.clicks]);

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
              dispatch(setStartIndex(index));
              dispatch(updateStartGameStatus(true));
            }
            if (isGameStarted && item.isBombed) {
              dispatch(setEndIndex(index));
              dispatch(updateFinishGameStatus('lose'));
            }
          }}
          handlePressedIndex={(button: 'left' | 'rightAdd' | 'rightDel') => {
            if (button === 'left') {
              dispatch(updateLeftClicks([index]));
              dispatch(increaseLeftCounter());
            } else if (button === 'rightAdd') {
              if (right.clicks.length < Number(bombNumber)) {
                dispatch(updateRightClicks([index]));
                dispatch(increaseRightCounter());
              }
            } else if (button === 'rightDel') {
              dispatch(filterRightClicks([index]));
              dispatch(increaseRightCounter());
            }
          }}
          cellSettings={item}
        />
      )),
    [bombNumber, dispatch, isGameStarted, rawCellsList, resetValue, right.clicks.length]
  );

  return (
    <StyledField aria-busy={Boolean(isGameFinished)} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
