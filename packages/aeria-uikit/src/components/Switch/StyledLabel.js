import styled from 'styled-components'
import {solidBorder} from '../../mixins/borders'

const StyledWrapper = styled.label`
  ${solidBorder}
  position: relative;
  display: inline-block;
  line-height: 0;
  padding: 2px;

  input[name="${props => props.name}"]:focus + & {
    border-color: ${props => props.theme.palette.primary}
  }

  input[name="${props => props.name}"]:checked + & {
    span{
      background-color: ${props => props.validation ? props.theme.palette.errorMain : props.theme.palette.primary};
      &:before {
        transform: translateX(100%) rotate(90deg);
      }
    }
  }
`

export default StyledWrapper
