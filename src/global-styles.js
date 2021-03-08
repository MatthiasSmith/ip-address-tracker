import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --very-dark-gray: hsl(0, 0%, 17%);
    --dark-gray: hsl(0, 0%, 59%);
    --font-weight-bold: 700;
    --font-weight-medium: 500;
    --border-radius: 0.95rem;
    --search-bar-height: 3.17rem;
  }

  html {
    font-family: 'Rubik', sans-serif;
    font-size: 18px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    color: var(--very-dark-gray);
    min-height: 100vh;
    background-color: lightgray;
    text-rendering: optimizelegibility;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top-section {
    padding: 1.72rem 1.5rem 0;
    background-image: url('../public/images/pattern-bg.png');
    background-size: 280% 100%;
    background-position: 55% 0%;
    background-repeat: no-repeat;
    box-shadow: 0px 0.5rem 0.35rem 0px rgba(0, 0, 0, .06);
    height: 37.5vh;
    min-height: 300px;
    position: relative;
    z-index: 1;
  }

  @media (min-width: 768px) {
    .top-section {
      background-size: cover;
      background-position: center;
      height: 27.5vh;
      min-height: 280px;
    }
  }
`;

export default GlobalStyles;
