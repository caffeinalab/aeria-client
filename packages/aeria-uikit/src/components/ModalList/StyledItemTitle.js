import styled from 'styled-components'
import {rem} from 'polished'

export default styled.h2`
  width: 100%;
  font-size: .8rem;
  font-weight: bold;
  color: ${props => props.theme.palette.primary};
  margin: ${rem('10px')} 0;
  text-transform: uppercase;
`
