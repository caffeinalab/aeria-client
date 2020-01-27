import { css } from 'styled-components'

const dashedBorder = css`
  border-radius: 3px;
  border: dashed 2px ${props => {
    if (props.validation || props.error) {
      return `${props.theme.palette.errorMain}`
    }
    return `${props.theme.palette.primary}`
  } };
`

export default dashedBorder
