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
