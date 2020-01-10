import styled from 'styled-components'
import {rem, transparentize} from 'polished'

const StyledContent = styled.div`
  position: relative;
  width: 100%;
  border 1px solid ${props => props.theme.palette.primary};
  border-top: 0;
  padding: 0 0 ${rem('20px')} 0;
`

export default StyledContent
