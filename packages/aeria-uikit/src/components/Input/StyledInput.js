import styled from 'styled-components'
import {rem, lighten} from 'polished'

import {headingSmall} from '../../mixins/typography'
import {solidBorder} from '../../mixins/borders'

const StyledInput = styled.input`
  input[type]&{
    ${headingSmall}
    ${solidBorder}

		display: block;
    width: 100%;
    height: auto;

		padding: ${rem('5px')} ${rem('10px')};
    outline: none;
		box-shadow: none;

    color: ${props => props.theme.palette.black};
    background: ${props => props.validation ? props.theme.palette.errorBg : props.theme.palette.white};

    font-weight: 400;
    text-transform: none;
		transition: border-color 0.3s, background-color 0.3s, box-shadow 0.3s;

		&:placeholder {
      ${headingSmall}

      font-weight: 400;
      text-transform: normal;

			color: ${props => lighten(0.7, props.theme.palette.black)};
    }

    &[disabled] {
      opacity: 0.4;
      background-color: ${props => lighten(0.7, props.theme.palette.black)};
    }

    &[readonly] {
      border: none;
    }
  }
`

export default StyledInput
