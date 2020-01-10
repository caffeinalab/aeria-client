import styled from 'styled-components'
import {rem} from 'polished'
import StyledWrapper from '~/components/Picture/StyledWrapper'
import { dashedBorder} from '~/mixins/borders'

export default styled(StyledWrapper)`
  ${dashedBorder}

  padding: ${rem('10px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
