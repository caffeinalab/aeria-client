import styled from 'styled-components'
import {rem} from 'polished'

const StyledCta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: .8rem;
  text-transform: uppercase;
  padding: 0 ${rem('10px')};
  cursor: pointer;
  pointer-events: bounding-box;
  width: ${rem('25px')};
  height: ${rem('25px')};
  border-radius: 3px;
  color: ${props => props.theme.palette.primary};

  svg{
    width: ${rem('25px')};
    stroke: currentColor;
    fill: currentColor;
    stroke-width: ${rem('2px')};
  }
  &:hover {
    color: ${props => props.theme.palette.white};
  }

  /* opacity: 0.4; */
  /* background-color: ${props => props.theme.palette.primary}; */
  transition: background-color 0.3s;
  &:hover{
    opacity: 1;
    background-color: ${props => props.theme.palette.errorMain};
  }

`

export default StyledCta
