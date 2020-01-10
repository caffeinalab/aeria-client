import styled from 'styled-components'
import { solidBorder } from '~/mixins/borders'

export default styled.div`
  ${solidBorder}

  background: ${props => props.validation ? props.theme.palette.errorBg : props.theme.palette.white};

  .ql-toolbar {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
  }

  .ql-container {
    border: none !important;
  }
`
