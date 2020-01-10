import styled from 'styled-components'

const StyledIcon = styled.svg`
  fill: ${props => {
    return props.theme.palette[props.color]
  }}
`

export default StyledIcon
