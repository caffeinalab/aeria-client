import styled from 'styled-components'
import {rem} from 'polished'
import {dashedBorder} from '@aeria/uikit'

const StyledContainerButton = styled.div`
  ${dashedBorder}
  border-top: 0;
  width: 100%;
  display: flex;
  padding: ${rem('20px')};
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`

export default StyledContainerButton
