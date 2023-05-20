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
