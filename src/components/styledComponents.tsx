import styled from 'styled-components';
import { Form } from 'react-router-dom';
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

export const StyledContainer = styled('div')`
  width: 300px;
  background-color: rgba(0, 47, 0, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  &:before,
  &:after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 3px;
    border: 2px solid #00ee00;
    left: -2px;
  }
  &:before {
    border-bottom: none;
    top: 0;
  }
  &:after {
    border-top: none;
    bottom: 0;
  }
  h3 {
    text-transform: uppercase;
    position: absolute;
    top: -1.1rem;
    left: 20px;
    margin: 0;
    color: #00ee00;
    display: block;
    padding: 0 10px;
    line-height: 1.1rem;
    border-bottom: 2px solid rgba(0, 47, 0, 0.8);
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  select,
  button {
    padding: 0.5rem;
    background-color: rgba(0, 47, 0, 1);
    color: #00ee00;
    text-align: center;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    appearance: textfield;
  }
  select {
    appearance: none;
    &:focus {
    }
  }
  button {
    background-color: #00ee00;
    color: rgba(0, 47, 0, 1);
    font-weight: bold;
    text-transform: uppercase;
  }
`;
