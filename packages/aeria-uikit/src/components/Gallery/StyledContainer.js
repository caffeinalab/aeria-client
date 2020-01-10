import styled from 'styled-components'
import StyledWrapper from '~/components/Picture/StyledWrapper'

import {dashedBorder} from '~/mixins/borders'

const StyledContainer = styled(StyledWrapper)`
  ${dashedBorder}
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  flex-flow: row wrap;
  align-items: flex-end;
`

export default StyledContainer
