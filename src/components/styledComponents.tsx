import styled from 'styled-components';
import { Form } from 'react-router-dom';
import { checkColor, checkGridSize, checkSize } from '../utils/utils';

export const StyledField = styled.ul`
  width: ${(props) => checkSize(props['aria-details'])};
  height: ${(props) => checkSize(props['aria-details'])};
  display: grid;
  grid-template-columns: ${(props) => checkGridSize(props['aria-details'])};
  grid-template-rows: ${(props) => checkGridSize(props['aria-details'])};
  grid-column-gap: 1px;
  grid-row-gap: 1px;
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
  position: relative;
  .additionIcon {
    position: absolute;
    font-size: 0.6rem;
    bottom: 0.2rem;
    right: 0.2rem;
  }
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
  background-color: rgba(0, 47, 0, 0.8);
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  position: relative;
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

export const StyledContainerCentred = styled(StyledContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 10rem;
  align-items: unset;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 300px;

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    background-color: rgba(0, 47, 0, 0);
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
`;

export const StyledAsideItem = styled('li')`
  background-color: rgba(0, 47, 0, 1);
  border-bottom: 2px solid black;
  border-right: 1px solid black;
  color: #00ee00;
  padding: 0.5rem;
  font-size: 1.2rem;
  flex-grow: 0;
`;

export const StyledAsideItemExtended = styled(StyledAsideItem)`
  flex-grow: 22;
`;

export const StyledButton = styled('button')`
  background-color: #00ee00;
  color: rgba(0, 47, 0, 1);
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.2rem;
`;
