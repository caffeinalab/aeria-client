import styled from 'styled-components'
import {rem} from 'polished'

const StyledWrapper = styled.div`
  display: block;
  position: relative;
  padding: ${rem('10px')};

  &:after{
    display: ${props => props.collapsable ? 'block' : 'none'};

    position: absolute;
    bottom: 0;
    left: ${rem('10px')};
    right: ${rem('10px')};
    height: ${rem('1px')};

    content: '';
    background-color: ${props => props.accordionState ? props.theme.palette.primary : 'transparent' };
    transition: background-color 0.3s 0.3s;
  }
`

export default StyledWrapper
