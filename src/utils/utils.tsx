/* eslint-disable no-plusplus */

import { getBorderIndexes, getRangeWithBorder } from './funcsToOpenNearbyEmptyCells';
import { PressedIndexesType } from './interfaces';

export function clearOfDuplicates(array: number[]) {
  return Array.from(new Set(array));
}

export function getFieldSettings(difficulty: string) {
  const fieldSettings = {
    easy: { cellsNumber: 100, width: 10 },
    medium: { cellsNumber: 225, width: 15 },
    hard: { cellsNumber: 625, width: 25 },
  };
  return fieldSettings[difficulty as keyof typeof fieldSettings];
}

export function checkSize(prop: string | undefined) {
  switch (prop) {
    case 'medium':
      return '42rem';
    case 'hard':
      return '47rem';
    default:
      return '28rem';
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
      return 'white';
    case 'empty':
      return 'white';
    case 'bomb':
      return 'red';
    case 'question':
      return 'orange';

    default:
      return '#9c8f77';
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
  bombNumber: string,
  startIndex: number | undefined
) {
  const arrayOfEmptyCells: number[] = new Array(cellsNumber).fill(0);

  if (startIndex === undefined) {
    return arrayOfEmptyCells;
  }

  const arrayOfBombs: number[] = new Array(Number(bombNumber)).fill(1);
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
  list: number[],
  bombsList: number[],
  ranges: number[][],
  pressedIndexes: PressedIndexesType,
  width: number,
  endIndex: number | undefined,
  isGameFinished: false | 'win' | 'lose'
) {
  const { right, left } = pressedIndexes;

  const rangesWithBorders = ranges.map((item) => getRangeWithBorder(item, bombsList, width));
  const openedCells = clearOfDuplicates(
    left.clicks.map((elem) => addOpenedChunk(elem, ranges, rangesWithBorders)).flat()
  );

  const cells = list.map((elem, index) => {
    const cell = {
      isBombed: Boolean(elem),
      nearbyBombs: bombsList[index],
      isOpen: (() => {
        if (isGameFinished) {
          if (endIndex === index) {
            return 'left';
          }
          if (right.totalClicks.includes(index) && right.clicks.includes(index)) {
            return 'opened-right';
          }

          if (right.totalClicks.includes(index)) {
            return 'opened';
          }
          if (right.clicks.includes(index)) {
            return 'right';
          }
        }

        if (openedCells.includes(index)) {
          return 'left';
        }
        if (right.clicks.includes(index)) {
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
