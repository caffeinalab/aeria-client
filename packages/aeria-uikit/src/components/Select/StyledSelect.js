import styled, {css} from 'styled-components'
import Select from 'react-select'
import Async from 'react-select/async'

import { solidBorder} from '../../mixins/borders'

const commonStyle = css`
  .AeriaSelect__control {
    ${solidBorder}

    &--is-focused, &:hover {
      outline: none;
      box-shadow: none;
      border-color: ${props => props.error ? props.theme.palette.errorMain : props.theme.palette.primary};
    }
  }

  .AeriaSelect__menu {
    z-index: 3;
  }

  .AeriaSelect__option {
    cursor: pointer;

    &--is-focused, &:hover {
      color: ${props => props.theme.palette.black};
      background-color: ${props => props.theme.palette.primaryLight};
    }

    &--is-selected {
      color: ${props => props.theme.palette.white} !important;
      background-color: ${props => props.theme.palette.primary}!important;
    }
  }

  .AeriaSelect__multi-value {
    background-color: ${props => props.theme.palette.primaryLight};
  }
`
export const StyledAsync = styled(Async)`
  ${commonStyle}
`

export const StyledSelect = styled(Select)`
  ${commonStyle}
`
