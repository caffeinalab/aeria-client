import styled from 'styled-components'
import {rem} from 'polished'

import {solidBorder} from '~/mixins/borders'

const StyledIndicator = styled.span`
  ${solidBorder}

  position: relative;

  display: inline-block;

  width: ${rem('25px')};
  height: ${rem('25px')};

  background-color: transparent;
  cursor: pointer;

  &:before {
    position: absolute;
    content: '';
    top: ${rem('3px')};
    left: ${rem('3px')};
    right: ${rem('3px')};
    bottom: ${rem('3px')};

    background-color: ${props => props.error ? props.theme.palette.errorMain : props.theme.palette.primary};

    opacity: 0;
    transform: scale3d(1.2, 1.2, 1.2) perspective(1px);
    transition: transform 0.2s, opacity 0.2s;
  }

  input[name="${props => props.name}"]:checked + &:before {
    opacity: 1;
    transform: scale3d(1, 1, 1) perspective(1px);
  }
  input[name="${props => props.name}"]:focus + &{
    border-width: 2px;
    border-color: ${props => props.error ? props.theme.palette.errorMain : props.theme.palette.primary};
  }
`

export default StyledIndicator
