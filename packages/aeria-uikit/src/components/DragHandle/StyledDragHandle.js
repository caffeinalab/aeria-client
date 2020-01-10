import styled from 'styled-components'

import {rem} from 'polished'
export default styled.span`
  position: absolute;
  left: 0px;
  top: 0px;
  width: ${rem('13px')};
  height: 100%;
  background-color: ${props => props.theme.palette.primary};
  cursor: -webkit-grab;
  span {
    position: absolute;
    width:  ${rem('4px')};
    height:  ${rem('4px')};
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.palette.white};
    &:first-child {
      transform: translate(-50%,  ${rem('-12px')});
    }
    &:last-child {
      transform: translate(-50%, ${rem('8px')});
    }
  }
`
