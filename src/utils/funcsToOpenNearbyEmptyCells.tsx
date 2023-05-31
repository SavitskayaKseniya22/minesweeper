/* eslint-disable no-plusplus */
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
      extrData = Array.from(new Set(extrData));

      const filtered = restArrays.filter((item) => {
        const commonData = extrData.concat(item);
        const changedData = Array.from(new Set(commonData));
        if (commonData.length === changedData.length) {
          return false;
        }
        return true;
      });

      if (filtered.length) {
        result.push(rangeToChange[i].concat(filtered.flat()));

        rangeToChange = rangeToChange.filter((rangeItem) => {
          const commonData = filtered.flat().concat(rangeItem);
          const changedData = Array.from(new Set(commonData));
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

const fieldSettings = {
  easy: { bombNumber: 100, widthOfField: 10 },
  medium: { bombNumber: 225, widthOfField: 15 },
  hard: { bombNumber: 625, widthOfField: 25 },
};

export default function getConnectedRanges(array: number[], difficulty: string) {
  const { widthOfField } = fieldSettings[difficulty as keyof typeof fieldSettings];
  const arrayOfIndexes = getArrayOfIndexes(array);
  const arrayToChange = array.slice();
  const chopedArray = cutArray(arrayToChange, widthOfField);
  const chopedArrayOfIndxes = cutArray(arrayOfIndexes, widthOfField);
  const ranges = getRanges(chopedArray, chopedArrayOfIndxes);
  return reduceRanges(ranges, widthOfField);
}
