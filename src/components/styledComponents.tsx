import styled, { css } from 'styled-components';

export const BasicStyledContainer = css`
  background-color: rgba(0, 47, 0, 0.8);
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
  & > h3 {
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
export const StyledContainer = styled('div')`
  ${BasicStyledContainer}
`;

export const StyledContainerCentred = styled(StyledContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 10rem;
  align-items: unset;
`;

export const StyledList = styled('ul')`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const StyledListItem = styled('li')`
  ${BasicStyledContainer}
  ol {
    width: 100%;
  }
  li {
    list-style-type: decimal;
    list-style: unset;
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
  font-size: 1.2rem;
  position: relative;
`;

export const StyledButtonWide = styled(StyledButton)`
  width: 100%;
`;

export const StyledTransparentButton = styled(StyledButton)`
  background-color: transparent;
  color: #00ee00;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2rem;
`;
