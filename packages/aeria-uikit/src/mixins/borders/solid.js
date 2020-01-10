import { css } from 'styled-components'

const solidBorder = css`
  border-radius: 3px;
  border: solid 2px ${props => {
    if (props.validation) {
      return `${ props.theme.palette.errorMain}`
    }
    return `${ props.theme.palette.greyLight}`
  } };
  &:focus{
    border-color: ${props => props.validation ? props.theme.palette.errorMain : props.theme.palette.primary};
  }
`

export default solidBorder
