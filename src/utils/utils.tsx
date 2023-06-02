/* eslint-disable no-plusplus */

import { getAroundIndexesForArray } from './funcsToOpenNearbyEmptyCells';

export function getFieldSettings(difficulty: string) {
  const fieldSettings = {
    easy: { cellsNumber: 100, widthOfField: 10 },
    medium: { cellsNumber: 225, widthOfField: 15 },
    hard: { cellsNumber: 625, widthOfField: 25 },
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

function correctExtremeRightValue(i: number, array: number[], widthOfField: number) {
  if (i % widthOfField === 0) {
    return 0;
  }

  return array[i];
}

function correctExtremeLeftValue(i: number, array: number[], widthOfField: number) {
  if (i % widthOfField === 9) {
    return 0;
  }

  return array[i];
}

export function getNearbyBombs(i: number, array: number[], widthOfField: number) {
  let count = 100;
  if (!array[i]) {
    const upperIndex = i - widthOfField;
    const lowerIndex = i + widthOfField;

    const topLine = [
      correctExtremeLeftValue(upperIndex - 1, array, widthOfField),
      array[upperIndex],
      correctExtremeRightValue(upperIndex + 1, array, widthOfField),
    ];

    const middleLine = [
      correctExtremeLeftValue(i - 1, array, widthOfField),
      correctExtremeRightValue(i + 1, array, widthOfField),
    ];

    const bottomLine = [
      correctExtremeLeftValue(lowerIndex - 1, array, widthOfField),
      array[lowerIndex],
      correctExtremeRightValue(lowerIndex + 1, array, widthOfField),
    ];

    count = topLine
      .concat(middleLine)
      .concat(bottomLine)
      .filter((value) => value !== undefined)
      .reduce((a, b) => Number(a) + Number(b));
  }

  return count;
}

export function getCellsContentList(
  trigger: boolean,
  cellsNumber: number,
  bombNumber: string,
  indexToInsert: number | undefined
) {
  const arrayOfEmptyCells: number[] = new Array(cellsNumber).fill(0);

  if (!trigger) {
    return arrayOfEmptyCells;
  }

  const arrayOfBombs: number[] = new Array(Number(bombNumber)).fill(1);
  const gameSetup = shuffle(
    arrayOfBombs.concat(arrayOfEmptyCells).slice(0, arrayOfEmptyCells.length)
  );

  if (indexToInsert) {
    gameSetup.splice(indexToInsert as number, 0, 0);
    const indexToDelete = gameSetup.indexOf(0, indexToInsert as number);
    gameSetup.splice(indexToDelete + 1, 1);
  }

  return gameSetup;
}
export function addOpenedChunkSize(i: number, shortRange: number[][], longRange: number[][]) {
  const elemInShortRange = shortRange.find((element) => element.includes(i));
  const elemInLongRange = longRange.find((element) => element.includes(i));

  if (elemInShortRange && elemInLongRange) {
    return elemInLongRange.length;
  }

  if (!elemInShortRange && elemInLongRange) {
    return 0;
  }

  return 1;
}

export function getCellsList(
  list: number[],
  bombsList: number[],
  ranges: number[][],
  pressedIndexes: number[],
  width: number
) {
  const filtered = pressedIndexes
    ? ranges.filter((item) => {
        const commonData = pressedIndexes.concat(item);
        const changedData = Array.from(new Set(commonData));
        if (commonData.length === changedData.length) {
          return false;
        }
        return true;
      })
    : [];

  const filteredWithBorders = filtered.map((item) =>
    getAroundIndexesForArray(item, bombsList, width)
  );

  const cells = list.map((elem, index) => {
    const cell = {
      isBombed: Boolean(elem),
      nearbyBombs: bombsList[index],

      isOpen: filteredWithBorders.find((element) => element.includes(index)) ? 'left' : 'false',
    };

    return cell;
  });
  return cells;
}
