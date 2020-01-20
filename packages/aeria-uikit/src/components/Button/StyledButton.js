import styled from 'styled-components'
import {rem} from 'polished'

import {buttonMixin} from '../../mixins/button'
import {headingSmall} from '../../mixins/typography'

export default styled.button`
  ${buttonMixin}

  ${headingSmall}

  position: relative;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  min-width: ${rem('160px')};
  height: ${rem('50px')};
  padding: 0 ${rem('40px')};

  line-height: 1;

  color: ${props => props.theme.palette.white};
  background-color: ${props => props.theme.palette.primary};

  text-transform: uppercase;

  transition: background-color 0.3s;

  cursor: pointer;

  text-decoration: none;
  text-transform: uppercase;

  font-weight: 500;

  &:hover {
    background-color: ${props => props.theme.palette.primaryDark};
  }

  &:active {
    outline: none;
    background-color: ${props => props.theme.palette.primaryLight};
  }

  &[disabled] {
    opacity: 0.6;
    pointer-events: none;
  }

  > * {
    padding: ${rem('1px')}
  }
`
