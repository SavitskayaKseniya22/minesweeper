/* eslint-disable no-plusplus */
export function checkSize(prop: string | undefined) {
  switch (prop) {
    case 'medium':
      return '468px';
    case 'hard':
      return '768px';
    default:
      return '318px';
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
      return '#9f9f9f';
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

const fieldSettings = {
  easy: { bombNumber: 100, widthOfField: 10 },
  medium: { bombNumber: 225, widthOfField: 15 },
  hard: { bombNumber: 625, widthOfField: 25 },
};

function correctExtremeValue(i: number, array: number[], widthOfField: number) {
  if (i % widthOfField === 0 || (i + 1) % widthOfField === 0) {
    return 0;
  }
  return array[i];
}

export function getNearbyBombs(i: number, array: number[], difficulty: string) {
  const { widthOfField } = fieldSettings[difficulty as keyof typeof fieldSettings];

  const upperIndex = i - widthOfField;
  const lowerIndex = i + widthOfField;

  const topLine = [
    correctExtremeValue(upperIndex - 1, array, widthOfField),
    array[upperIndex],
    correctExtremeValue(upperIndex + 1, array, widthOfField),
  ];

  const middleLine = [
    correctExtremeValue(i - 1, array, widthOfField),
    correctExtremeValue(i + 1, array, widthOfField),
  ];

  const bottomLine = [
    correctExtremeValue(lowerIndex - 1, array, widthOfField),
    array[lowerIndex],
    correctExtremeValue(lowerIndex + 1, array, widthOfField),
  ];

  const count = topLine.concat(middleLine).concat(bottomLine);
  return count.filter((value) => value !== undefined).reduce((a, b) => Number(a) + Number(b));
}

export function getCellsList(
  trigger: boolean,
  difficulty: string,
  bombNumber: string,
  indexToInsert: number | undefined
) {
  const arrayOfEmptyCells = new Array(
    fieldSettings[difficulty as keyof typeof fieldSettings].bombNumber
  ).fill(0);

  if (!trigger) {
    return arrayOfEmptyCells;
  }

  const arrayOfBombs = new Array(Number(bombNumber)).fill(1);
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
