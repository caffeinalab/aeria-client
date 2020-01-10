import styled from 'styled-components'
import {rem} from 'polished'
import {solidBorder} from '~/mixins/borders'

const indicatorSize = 25
const paddingSize = 3

const StyledIndicator = styled.span`
  position: relative;

  display: inline-block;

  width: ${rem(`${(paddingSize * 2) + (indicatorSize * 2)}px`)};
  height: ${rem(`${(paddingSize * 2) + indicatorSize}px`)};
  padding: ${rem(`${paddingSize}px`)};

  background-color: ${props => props.error ? props.theme.palette.errorMain : props.theme.palette.primaryLight};
  transition: background-color 0.3s;
  cursor: pointer;

  &::before {
    ${solidBorder};
    content: '';
    display: block;
    width: ${rem(`${indicatorSize}px`)};
    height: ${rem(`${indicatorSize}px`)};
    background-color: ${props => props.theme.palette.white};

    transform: translateX(0rem) rotate(0deg);
    transition: transform 0.2s;
  }
`

export default StyledIndicator
