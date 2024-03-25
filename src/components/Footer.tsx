import React from 'react';
import styled from 'styled-components';

export const StyledFooter = styled('footer')`
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 1rem;
`;

function Footer() {
  return (
    <StyledFooter>
      <span>made by Kseniia Savitskaia in 2023</span>
    </StyledFooter>
  );
}

export default Footer;
