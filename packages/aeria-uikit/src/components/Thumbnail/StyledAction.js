import styled from 'styled-components'

import {buttonMixin} from '../../mixins/button'
import {headingSmall} from '../../mixins/typography'

const StyledAction = styled.button`
  ${buttonMixin}

  ${headingSmall}

  position: relative;
  z-index: 2;

  display: inline-flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;

  flex: 0 0 auto;

  width: 100%;
  height: 50%;

  color: ${props => props.theme.palette.white};
  background-color: ${props => props.theme.palette.secondary};

  opacity: 0.5;
  transition: opacity 0.3s;

  cursor: pointer;

  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  &:not(:last-child) {
    border-bottom: solid 1px ${props => props.theme.palette.white};
  }

  &:hover,
  &:focus {
    opacity: 1;
  }
`

export default StyledAction
