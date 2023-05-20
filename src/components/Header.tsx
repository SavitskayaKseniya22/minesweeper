import React from 'react';
import styled from 'styled-components';

export const StyledHeader = styled('header')`
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 1rem;
`;

export function Header() {
  return (
    <StyledHeader>
      <h2>Minesweeper</h2>
    </StyledHeader>
  );
}
