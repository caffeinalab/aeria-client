import styled from 'styled-components'
import {rem} from 'polished'

const StyledWrapper = styled.div`
  position: relative;

  display: flex;
  width: 100%;

  margin-bottom: ${rem('5px')};

  background-color: ${props => props.theme.palette.primaryLight};
  opacity: ${props => props.draft ? 0.5 : 1};
`

export default StyledWrapper
