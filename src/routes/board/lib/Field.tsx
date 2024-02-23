import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cell from './Cell';
import {
  addOpenedChunk,
  clearOfDuplicates,
  getCellsContentList,
  getCellsList,
  getNearbyBombs,
  isItRecord,
  saveRecord,
  sortDataToMakeCells,
} from '../../../utils/utils';

import getConnectedRanges, { getRangeWithBorder } from '../../../utils/funcsToOpenNearbyEmptyCells';
import { StyledField } from '../../../components/styledComponents';
import { RootState } from '../../../store/store';
import {
  updateFinishGameStatus,
  updateIsItRecord,
  updateStartGameStatus,
} from '../../../store/GameCycleSlice';
import {
  filterRightClicks,
  increaseLeftCounter,
  increaseRightCounter,
  setEndIndex,
  setStartIndex,
  updateInitData,
  updateLeftClicks,
  updateRightClicks,
} from '../../../store/GameDataSlice';

function Field() {
  const stopwatch = useSelector((state: RootState) => state.stopwatch);
  const userName = useSelector((state: RootState) => state.user.name);
  const dispatch = useDispatch();
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished } = gameCycleValues;

  const gameSettings = useSelector((state: RootState) => state.gameSettings);
  const { bombNumber, difficulty } = gameSettings.formValues;
  const { cellsNumber, width } = gameSettings.fieldParameters;

  const gameData = useSelector((state: RootState) => state.gameData);
  const { left, right, startIndex } = gameData.clicks;
  const { initData } = gameData;

  const scoreTable = useSelector((state: RootState) => state.scoreTable);
  const dataToMakeCells = useMemo(() => {
    if (initData.length > 0 && initData.find((element) => element !== 0)) {
      return initData;
    }
    return getCellsContentList(cellsNumber, bombNumber, startIndex);
  }, [bombNumber, cellsNumber, startIndex, initData]);

  useEffect(() => {
    if (JSON.stringify(initData) !== JSON.stringify(dataToMakeCells)) {
      dispatch(updateInitData(dataToMakeCells));
    }
  }, [dataToMakeCells, dispatch, initData]);

  const sortedDataToMakeCells = useMemo(
    () => sortDataToMakeCells(dataToMakeCells),
    [dataToMakeCells]
  );
  const { freeCells } = sortedDataToMakeCells;

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

  const rangesWithBorders = useMemo(
    () => ranges.map((item) => getRangeWithBorder(item, bombsList, width)),
    [bombsList, ranges, width]
  );

  const openedCells = useMemo(
    () =>
      clearOfDuplicates(
        left.list
          .map((elem) => addOpenedChunk(elem, ranges, rangesWithBorders))
          .flat()
          .sort((a, b) => a - b)
      ),
    [left.list, ranges, rangesWithBorders]
  );

  const rawCellsList = useMemo(
    () => getCellsList(gameData, bombsList, openedCells, isGameFinished),
    [bombsList, gameData, isGameFinished, openedCells]
  );

  const cellsList = useMemo(
    () =>
      rawCellsList.map((item, index) => (
        <Cell
          key={index.toString() + item.nearbyBombs}
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
              if (right.list.length < Number(bombNumber)) {
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
    [bombNumber, dispatch, isGameStarted, rawCellsList, right.list.length]
  );

  useEffect(() => {
    const filterdRightClicks = right.list.filter((elem) => openedCells.includes(elem));
    if (filterdRightClicks.length) {
      dispatch(filterRightClicks(filterdRightClicks));
    }
  }, [dispatch, openedCells, right.list]);

  useEffect(() => {
    if (
      JSON.stringify(openedCells) === JSON.stringify(freeCells) &&
      isGameStarted &&
      !isGameFinished
    ) {
      dispatch(updateFinishGameStatus('win'));
      const record = isItRecord(stopwatch.value, difficulty, scoreTable);

      if (record) {
        saveRecord(userName, record.place, stopwatch.value, difficulty, rawCellsList, dispatch);
        dispatch(updateIsItRecord(record));
      }
    }
  }, [
    difficulty,
    dispatch,
    freeCells,
    isGameFinished,
    isGameStarted,
    openedCells,
    rawCellsList,
    scoreTable,
    stopwatch.value,
    userName,
  ]);

  return (
    <StyledField aria-busy={Boolean(isGameFinished)} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
