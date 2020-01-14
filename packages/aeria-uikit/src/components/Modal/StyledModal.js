import styled from 'styled-components'
import {transparentize} from 'polished'

const StyledModal = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;

  background-color: ${props => transparentize(0.2, props.theme.palette.black)};

  display: flex;
  align-items: center;
  justify-content: center;
`

export default StyledModal
