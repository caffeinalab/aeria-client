import styled from 'styled-components'

import {dashedBorder} from '~/mixins/borders'

const StyledContainerButton = styled.div`
  ${dashedBorder}
  border-top: 0;
  width: 100%;
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`

export default StyledContainerButton
