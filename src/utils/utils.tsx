/* eslint-disable no-plusplus */

import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import {
  ScoreTableState,
  updateFirstResult,
  updateSecondResult,
  updateThirdResult,
} from '../store/ScoreTableSlice';
import { getBorderIndexes, getRangeWithBorder } from './funcsToOpenNearbyEmptyCells';
import { GameDataState } from './interfaces';

export function clearOfDuplicates(array: number[]) {
  return Array.from(new Set(array));
}

export function getFieldParameters(difficulty: string) {
  switch (difficulty) {
    case 'easy':
      return {
        cellsNumber: 100,
        width: 10,
        bombNumberDefault: 10,
        range: {
          min: 10,
          max: 99,
        },
      };
    case 'medium':
      return {
        cellsNumber: 225,
        width: 15,
        bombNumberDefault: 30,
        range: {
          min: 30,
          max: 224,
        },
      };
    case 'hard':
      return {
        cellsNumber: 625,
        width: 25,
        bombNumberDefault: 100,
        range: {
          min: 100,
          max: 624,
        },
      };
    default:
      return {
        cellsNumber: 100,
        width: 10,
        bombNumberDefault: 10,
        range: {
          min: 10,
          max: 99,
        },
      };
  }
}

export function checkSize(prop: string | undefined) {
  switch (prop) {
    case 'medium':
      return '32rem';
    case 'hard':
      return '44rem';
    default:
      return '22rem';
  }
}

export function checkGridSize(prop: string | undefined) {
  switch (prop) {
    case 'medium':
      return 'repeat(15, 1fr)';
    case 'hard':
      return 'repeat(25, 1fr)';
    default:
      return 'repeat(10, 1fr)';
  }
}

export function checkColor(prop: string | undefined) {
  switch (prop) {
    case 'opened':
      return '#9c8f77';
    case 'empty':
      return 'rgba(0, 47, 0, 0.8)';
    case 'bomb':
      return 'red';
    case 'question':
      return 'orange';

    default:
      return 'white';
  }
}

export function shuffle(array: number[]) {
  const arrayToChange = array.slice();
  for (let i = arrayToChange.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayToChange[i], arrayToChange[j]] = [arrayToChange[j], arrayToChange[i]];
  }
  return arrayToChange;
}

export function getNearbyBombs(i: number, dataToMakeCells: number[], width: number) {
  const borderIndexes = getBorderIndexes(i, width);
  const nearbyBombs: number[] = [];
  borderIndexes.forEach((item) => {
    nearbyBombs.push(dataToMakeCells[item]);
  });

  return nearbyBombs.filter((value) => value !== undefined).reduce((a, b) => a + b);
}

export function getCellsContentList(
  cellsNumber: number,
  bombNumber: number,
  startIndex: number | undefined
) {
  const arrayOfEmptyCells: number[] = new Array(cellsNumber).fill(0);
  if (startIndex === undefined) {
    return arrayOfEmptyCells;
  }

  const arrayOfBombs: number[] = new Array(bombNumber).fill(1);
  const gameSetup = shuffle(
    arrayOfBombs.concat(arrayOfEmptyCells).slice(0, arrayOfEmptyCells.length)
  );

  const elemToTransfer = gameSetup.slice(startIndex, startIndex + 1);
  const indexToTransfer = [gameSetup.indexOf(startIndex + 1), gameSetup.indexOf(0), 0].sort(
    (a, b) => b - a
  )[0];

  gameSetup.splice(startIndex, 1, 0);
  gameSetup.splice(indexToTransfer, 1, elemToTransfer[0]);

  return gameSetup;
}

export function addOpenedChunk(i: number, shortRange: number[][], longRange: number[][]) {
  const elemInShortRange = shortRange.filter((element) => element.includes(i)).flat();
  const elemInLongRange = longRange.filter((element) => element.includes(i)).flat();

  if (elemInShortRange.length && elemInLongRange.length) {
    return elemInLongRange;
  }

  return [i];
}

export function getCellsList(
  gameData: GameDataState,
  bombsList: number[],
  ranges: number[][],
  width: number,
  isGameFinished: false | 'win' | 'lose',
  bombedCells: number[]
) {
  const { right, left, endIndex } = gameData.clicks;

  const rangesWithBorders = ranges.map((item) => getRangeWithBorder(item, bombsList, width));
  const openedCells = clearOfDuplicates(
    left.list.map((elem) => addOpenedChunk(elem, ranges, rangesWithBorders)).flat()
  );

  const cells = gameData.initData.map((elem, index) => {
    const cell = {
      isBombed: Boolean(elem),
      nearbyBombs: bombsList[index],
      isOpen: (() => {
        if (isGameFinished) {
          if (endIndex === index) {
            return 'left';
          }
          if (bombedCells.includes(index) && right.list.includes(index)) {
            return 'opened-right';
          }
          if (bombedCells.includes(index)) {
            return 'opened';
          }
        }

        if (openedCells.includes(index)) {
          return 'left';
        }
        if (right.list.includes(index)) {
          return 'right';
        }
        return 'false';
      })(),
      range: addOpenedChunk(index, ranges, rangesWithBorders),
    };

    return cell;
  });
  return cells;
}

export function sortDataToMakeCells(data: number[]) {
  const sortedData: { freeCells: number[]; bombedCells: number[] } = {
    freeCells: [],
    bombedCells: [],
  };

  data.forEach((elem, index) => {
    if (elem !== 1) {
      sortedData.freeCells.push(index);
    }
  });

  data.forEach((elem, index) => {
    if (elem === 1) {
      sortedData.bombedCells.push(index);
    }
  });

  return sortedData;
}

export function isItRecord(timeValue: number, difficulty: string, scoreTable: ScoreTableState) {
  const scoreData = scoreTable[difficulty as keyof ScoreTableState];

  if (scoreData.first === undefined || timeValue <= scoreData.first.time) {
    return { place: 1 };
  }
  if (
    scoreData.second === undefined ||
    (scoreData.first &&
      scoreData.second &&
      timeValue > scoreData.first.time &&
      timeValue <= scoreData.second.time)
  ) {
    return { place: 2 };
  }
  if (
    scoreData.third === undefined ||
    (scoreData.third &&
      scoreData.second &&
      timeValue > scoreData.second.time &&
      timeValue <= scoreData.third.time)
  ) {
    return { place: 3 };
  }
  return false;
}

export function saveRecord(
  place: number,
  timeValue: number,
  difficulty: string,
  cellsList: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: string;
    range: number[];
  }[],
  dispatch: Dispatch<AnyAction>
) {
  const savedData = {
    difficulty,
    data: {
      name: 'name',
      time: timeValue,
      data: cellsList,
      date: new Date().toString(),
    },
  };
  if (place === 1) {
    dispatch(updateFirstResult(savedData));
  }
  if (place === 2) {
    dispatch(updateSecondResult(savedData));
  }
  if (place === 3) {
    dispatch(updateThirdResult(savedData));
  }
}
