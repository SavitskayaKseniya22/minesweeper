import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  
  * {
    box-sizing: border-box;
  }

  #root{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  }

  li{
    list-style:none;
  }

  ul{
    margin:0;
    padding:0;
  }

  main{
    flex-grow:1;
  }
`;

export default GlobalStyle;
