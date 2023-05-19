import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  
  * {
    box-sizing: border-box;
  }

  #root{
    width: 100vw;
    height: 100vh;
  }

  li{
    list-style:none;
  }

  ul{
    margin:0;
    padding:0;
  }
`;

export default GlobalStyle;
