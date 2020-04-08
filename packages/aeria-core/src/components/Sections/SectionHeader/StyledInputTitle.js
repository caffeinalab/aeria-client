import styled from 'styled-components'
import {headingMediumBold} from '@aeria/uikit'

const StyledInputTitle = styled.input`
  input[type="text"]&{
    ${headingMediumBold}
    line-height: 1;
    min-height: auto;
    flex: 1 0 auto;

    border: none;
    box-shadow: none;
    outline: none;

    padding: 0;
    margin: 0;

    background-color: transparent;

    font-weight: 700;

    ::placeholder {
      opacity: 0.6;
      color: currentColor;

      transition: opacity 0.3s;
    }

    &:focus::placeholder {
      opacity: 1;
    }
  }
`

export default StyledInputTitle
