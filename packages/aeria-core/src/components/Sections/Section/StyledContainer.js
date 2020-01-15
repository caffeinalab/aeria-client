import styled from 'styled-components'
import {rem} from 'polished'

import {dashedBorder} from '~/mixins/borders'

export default styled.div`
  ${dashedBorder}
  border-top: 0;
  padding-left: ${rem('10px')};
  padding-right: ${rem('10px')};
  padding-bottom: ${rem('10px')};
`
