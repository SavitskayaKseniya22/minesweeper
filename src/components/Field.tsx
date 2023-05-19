import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

export const StyledField = styled.ul.attrs(() => ({
  hardeness: 'easy',
}))`
  margin: 0 auto;

  width: ${(props) => {
    switch (props.hardeness) {
      case 'medium':
        return '468px';
      case 'hard':
        return '768px';
      default:
        return '468px';
    }
  }};
  height: ${(props) => {
    switch (props.hardeness) {
      case 'medium':
        return '468px';
      case 'hard':
        return '750px';
      default:
        return '468px';
    }
  }};
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
`;

function Field({ hardeness }: { hardeness: string }) {
  // const [isPressed, setIsPressed] = useState(false);
  const numberOfCells = {
    easy: 100,
    medium: 225,
    hard: 625,
  };
  const arrayOfNumbers = new Array(numberOfCells[hardeness as keyof typeof numberOfCells]).fill(1);
  const listItems = arrayOfNumbers.map((number, index) => (
    <Cell key={number.toString() + index.toString()} />
  ));

  return <StyledField hardeness={hardeness}>{listItems}</StyledField>;
}

export default Field;
