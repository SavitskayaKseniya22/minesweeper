import React from 'react';
import styled from 'styled-components';

export const StyledHeader = styled('header')`
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 1rem;
`;

function Header() {
  return (
    <StyledHeader>
      <h2>Find your way through the wastelands</h2>
    </StyledHeader>
  );
}

export default Header;
