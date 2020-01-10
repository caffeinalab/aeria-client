import styled from 'styled-components'
import {rem} from 'polished'

const StyledAccordionButton = styled.div`
  position: relative;
  width: ${rem('20px')};
  height: ${rem('20px')};
  cursor: pointer;
  &:before{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;

    width: 0;
    height: 0;

    border-left: ${rem('6px')} solid transparent;
    border-right: ${rem('6px')} solid transparent;

    border-bottom: ${rem('6px')} solid ${props => props.theme.palette.primary};
    transform: ${props => !!props.accordionState ? 'translate(-50%, -50%) rotate(0deg)' : 'translate(-50%, -50%) rotate(180deg)'};
    transform-origin: center center;
    transition: transform 0.3s;
  }
`

export default StyledAccordionButton
