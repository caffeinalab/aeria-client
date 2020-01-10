import { createGlobalStyle } from 'styled-components'
import {rem} from 'polished'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    outline-color: ${props => props.theme.palette.primary}
  }


  body {
    font-family: 'Roboto', 'Open Sans', sans-serif;
    font-size: 100%;
  }

  #aeriaModal {
    position: fixed;
    z-index: 999999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: none;

    align-items: center;

    background: rgba(0,0,0,0.2);

    &[data-state="visible"] {
      display: flex;
    }

    > div {
      position: relative;
      width: 90%;
      max-width: ${rem('900px')};
      margin: 0 auto;
    }
  }

  /* for select input at the end of metabox that have overflow hidden */
  .-c-is--expanded:not(.-c-is--collapsing){
    overflow: visible !important;
  }

  .aeriaInputHidden{
    display: none;
  }
`

export default GlobalStyle
