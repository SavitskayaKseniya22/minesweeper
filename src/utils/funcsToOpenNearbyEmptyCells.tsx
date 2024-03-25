/* eslint-disable no-plusplus */

function clearOfDuplicates(array: number[]) {
  return Array.from(new Set(array));
}

function getArrayOfIndexes(array: number[]) {
  const madeArray = [];
  let i = 0;
  while (i < array.length) {
    madeArray.push(i);
    i++;
  }
  return madeArray;
}

function cutArray(array: number[], width: number) {
  let i = 0;
  const exitArray = [];
  while (i < array.length) {
    exitArray.push(array.slice(i, i + width));
    i += width;
  }
  return exitArray;
}

function getRanges(chopedArray: number[][], chopedArrayOfIndxes: number[][]) {
  const ranges = [];

  function rec(array: number[], i: number): number {
    if (array[i + 1] !== 0) {
      return i;
    }
    return rec(array, i + 1);
  }

  for (let i = 0; i < chopedArray.length; i++) {
    for (let j = 0; j < chopedArray[i].length; j++) {
      if (chopedArray[i][j] === 0) {
        const firstIndex = j;
        const secondIndex = rec(chopedArray[i], j);
        ranges.push(chopedArrayOfIndxes[i].slice(firstIndex, secondIndex + 1));
        j = secondIndex;
      }
    }
  }
  return ranges;
}

function reduceRanges(ranges: number[][], width: number) {
  function rec(range: number[][]): number[][] {
    const result = [];
    let rangeToChange = range.slice();

    for (let i = 0; i < rangeToChange.length; i++) {
      const restArrays = rangeToChange.slice(i + 1);

      let extrData: number[] = [];
      rangeToChange[i].forEach((j) => {
        extrData.push(j + width);
        extrData.push(j - width);
      });
      extrData = extrData.filter((value) => value >= 0);
      extrData = clearOfDuplicates(extrData);

      const filtered = restArrays.filter((item) => {
        const commonData = extrData.concat(item);
        const changedData = clearOfDuplicates(commonData);
        if (commonData.length === changedData.length) {
          return false;
        }
        return true;
      });

      if (filtered.length) {
        result.push(rangeToChange[i].concat(filtered.flat()));

        rangeToChange = rangeToChange.filter((rangeItem) => {
          const commonData = filtered.flat().concat(rangeItem);
          const changedData = clearOfDuplicates(commonData);
          if (commonData.length === changedData.length) {
            return true;
          }
          return false;
        });
      } else {
        result.push(rangeToChange[i]);
      }
    }

    if (JSON.stringify(range) === JSON.stringify(result)) {
      return result;
    }
    return rec(result);
  }
  return rec(ranges);
}

function correctExtremeValue(i: number, width: number, side: string) {
  if ((i % width === width - 1 && side === 'left') || (i % width === 0 && side === 'right')) {
    return -1;
  }

  return i;
}

export function getBorderIndexes(i: number, width: number) {
  const upperIndex = i - width;
  const lowerIndex = i + width;

  const topLine = [
    correctExtremeValue(upperIndex - 1, width, 'left'),
    upperIndex,
    correctExtremeValue(upperIndex + 1, width, 'right'),
  ];

  const middleLine = [
    correctExtremeValue(i - 1, width, 'left'),
    correctExtremeValue(i + 1, width, 'right'),
  ];

  const bottomLine = [
    correctExtremeValue(lowerIndex - 1, width, 'left'),
    lowerIndex,
    correctExtremeValue(lowerIndex + 1, width, 'right'),
  ];

  return topLine
    .concat(middleLine)
    .concat(bottomLine)
    .filter((value) => value > -1 && value < width * width);
}

export function getRangeWithBorder(range: number[], bombsList: number[], width: number) {
  const rangeWithBorder = range
    .map((centerValue) =>
      getBorderIndexes(centerValue, width)
        .filter((borderValue) => bombsList[borderValue] !== 0)
        .concat([centerValue])
    )
    .flat();
  return clearOfDuplicates(rangeWithBorder);
}

export default function getConnectedRanges(bombsList: number[], width: number) {
  const arrayOfIndexes = getArrayOfIndexes(bombsList);
  const arrayToChange = bombsList.slice();
  const chopedArray = cutArray(arrayToChange, width);
  const chopedArrayOfIndxes = cutArray(arrayOfIndexes, width);
  const ranges = getRanges(chopedArray, chopedArrayOfIndxes);
  const reducedRanges = reduceRanges(ranges, width);
  return reducedRanges;
}
