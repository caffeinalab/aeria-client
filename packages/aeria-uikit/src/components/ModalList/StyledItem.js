import styled from 'styled-components'
import {rem} from 'polished'

import {buttonMixin} from '../../mixins/button'
import {solidBorder} from '../../mixins/borders'

export default styled.button`
  ${buttonMixin};
  ${solidBorder};

  display: flex;
  flex-direction: column;
  width: 100%;

  margin: ${rem('3px')};
  padding: ${rem('30px')};
  border-radius: ${rem('4px')};
  text-align: center;
  cursor: pointer;
  min-height: ${rem('100px')};
  justify-content: center;
  align-items: center;

  outline: none;
  transition: border-color .3s ease-in-out;

  &:hover {
    border-color: ${props => props.theme.palette.primary};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}px) {
    flex: 1 0 auto;
    width: 33.3334%;

  }
`
