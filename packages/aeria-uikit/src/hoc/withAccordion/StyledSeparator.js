import styled from 'styled-components'
import {rem} from 'polished'

const StyledSeparator = styled.div`
  position: relative;
  display: inline-flex;
  flex: 1 0 auto;
  height: ${rem('20px')};
  cursor: pointer;

  &:before{
    position: absolute;
    top: ${rem('9px')};
    left: ${rem('10px')};
    right: ${rem('30px')};
    height: ${rem('1px')};

    content: '';
    background-color: ${props => props.theme.palette.primary };
  }
`

export default StyledSeparator
