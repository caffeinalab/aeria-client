import styled from 'styled-components'
import {rem} from 'polished'

import {headingSmall} from '../../mixins/typography'

const StyledLabel = styled.label`
  ${headingSmall}

  position: relative;
  display: inline-block;
  margin: 0;
  padding-right: ${rem('10px')};
  color: ${props => props.theme.palette.black};
  cursor: pointer;
`

export default StyledLabel
