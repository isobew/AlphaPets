import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  :root {
    --dark-font: #353535;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  h1 {
    color: var(--dark-font);
    margin-bottom: 1em;
    font-size: 2.1em;
  }

  .bold {
    font-weight: bold;
    color: var(--dark-font);
  }
`;
 
export default GlobalStyle;