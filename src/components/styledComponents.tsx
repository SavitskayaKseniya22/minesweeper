import styled from 'styled-components';
import { checkColor, checkGridSize, checkSize } from '../utils/utils';

export const StyledField = styled.ul`
  margin: 0 auto;
  width: ${(props) => checkSize(props['aria-details'])};
  height: ${(props) => checkSize(props['aria-details'])};
  display: grid;
  grid-template-columns: ${(props) => checkGridSize(props['aria-details'])};
  grid-template-rows: ${(props) => checkGridSize(props['aria-details'])};
  grid-column-gap: 2px;
  grid-row-gap: 1px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 2rem;
  pointer-events: ${(props) => {
    if (props['aria-busy']) {
      return 'none';
    }
    return 'auto';
  }};
`;

export const StyledCell = styled('li')`
  color: black;
  //border: 1px solid #232829;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => checkColor(props['aria-details'])};
  font-family: 'Overseer', sans-serif;
`;

export const StyledHeader = styled('header')`
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 1rem;
`;

export const StyledFooter = styled('footer')`
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 1rem;
`;
