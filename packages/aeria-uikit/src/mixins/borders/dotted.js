import { css } from 'styled-components'

const dottedMixin = css`
  border-radius: 3px;
  border: dotted 2px ${props => {
    if (props.validation || props.error) {
      return `${ props.theme.palette.errorMain}`
    }
    return `${ props.theme.palette.greyLight}`
  } };
`

export default dottedMixin
