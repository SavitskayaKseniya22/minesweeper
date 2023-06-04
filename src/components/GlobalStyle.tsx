import { createGlobalStyle } from 'styled-components';
import logo from '../assets/images/main-background2.jpg';
import overseer from '../assets/fonts/Overseer/OverseerItalic.otf';
import roboto from '../assets/fonts/Roboto/Roboto-Regular.ttf';

export const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'Overseer';
  src: url(${overseer}) format('otf'),   
}

@font-face {
  font-family: 'Roboto';
  src: url(${roboto}) format('ttf'),   
}

`;

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
    background-image:url(${logo});
    background-size:100%;
    background-position: center;
    background-repeat:no-repeat;
   color:white;
    font-family: 'Roboto', sans-serif;

    
  }

  main{
    display:flex;
    justify-content:center;
    align-items:center;
    
    
  }

  .side{
    position:absolute;
    left:0;

  }

  h2{
     font-family: 'Overseer', sans-serif;
     
     font-size: 4rem;
     margin:0;
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
