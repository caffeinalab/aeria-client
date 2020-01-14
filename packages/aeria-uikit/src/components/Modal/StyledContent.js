import styled from 'styled-components'
import {rem} from 'polished'

const StyledContent = styled.div`
  position: relative;

  width: 100%;
  max-width: ${rem('760px')};
  max-height: 80vh;

  padding: ${rem('80px')} ${rem('20px')} ${rem('20px')};

  border-radius: ${rem('5px')};
  background: white;

  overflow-y: auto;
`

export default StyledContent
