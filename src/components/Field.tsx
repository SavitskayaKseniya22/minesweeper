import React, { Dispatch, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
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
  setEndIndex,
  setStartIndex,
  updateInitData,
  updateLeftClicks,
  updateRightClicks,
} from '../store/GameDataSlice';
import {
  ScoreTableState,
  updateFirstResult,
  updateSecondResult,
  updateThirdResult,
} from '../store/ScoreTableSlice';

function isItRecord(
  timeValue: number,
  difficulty: string,
  scoreTable: ScoreTableState,
  cellsList: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: string;
    range: number[];
  }[],
  dispatch: Dispatch<AnyAction>
) {
  const scoreData = scoreTable[difficulty as keyof ScoreTableState];

  const savedData = {
    difficulty,
    data: {
      name: 'name',
      time: timeValue,
      data: cellsList,
    },
  };

  if (scoreData.first === undefined || timeValue <= scoreData.first.time) {
    dispatch(updateFirstResult(savedData));
  } else if (
    scoreData.second === undefined ||
    (scoreData.first &&
      scoreData.second &&
      timeValue > scoreData.first.time &&
      timeValue <= scoreData.second.time)
  ) {
    dispatch(updateSecondResult(savedData));
  } else if (
    scoreData.third === undefined ||
    (scoreData.third &&
      scoreData.second &&
      timeValue < scoreData.second.time &&
      timeValue <= scoreData.third.time)
  ) {
    dispatch(updateThirdResult(savedData));
  }
}

function Field({ resetValue }: { resetValue: number }) {
  const stopwatch = useSelector((state: RootState) => state.stopwatch);
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
  const { freeCells, bombedCells } = sortedDataToMakeCells;

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
    () => getCellsList(gameData, bombsList, ranges, width, isGameFinished, bombedCells),
    [bombsList, ranges, gameData, width, isGameFinished, bombedCells]
  );

  const openedCells = useMemo(
    () =>
      clearOfDuplicates(
        left.list
          .map((elem) => rawCellsList[elem].range)
          .flat()
          .sort((a, b) => a - b)
      ),
    [left.list, rawCellsList]
  );

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
    [bombNumber, dispatch, isGameStarted, rawCellsList, resetValue, right.list.length]
  );

  useEffect(() => {
    if (!isGameFinished) {
      const data = right.list.concat(openedCells);
      const dataWithoutDup = clearOfDuplicates(data);
      if (data.length !== dataWithoutDup.length) {
        dispatch(filterRightClicks(openedCells));
      }
    }
  }, [dispatch, isGameFinished, openedCells, right.list]);

  useEffect(() => {
    if (
      JSON.stringify(openedCells) === JSON.stringify(freeCells) &&
      isGameStarted &&
      !isGameFinished
    ) {
      dispatch(updateFinishGameStatus('win'));
      isItRecord(stopwatch.value, difficulty, scoreTable, rawCellsList, dispatch);
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
  ]);

  return (
    <StyledField aria-busy={Boolean(isGameFinished)} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
