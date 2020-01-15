import styled from 'styled-components'
import {rem} from 'polished'

const StyledCta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.palette.primary};
  font-size: .8rem;
  text-transform: uppercase;
  padding: 0 ${rem('10px')};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.palette.primaryDark};
  }
`

export default StyledCta
