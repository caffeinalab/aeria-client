import styled from 'styled-components'
import {rem} from 'polished'

import Button from '../Button'

export default styled(Button)`
  position: absolute;
  top: ${rem('20px')};
  right: ${rem('20px')};

  width: ${rem('40px')};
  min-width: ${rem('40px')};
  height: ${rem('40px')};

  padding: 0;
`
