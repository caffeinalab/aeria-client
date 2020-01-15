import styled from 'styled-components'
import {rem} from 'polished'

import {headingLarge} from '~/mixins/typography'

const StyledInfo = styled.div`
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: baseline;

  max-width: 100%;

  padding: ${rem('6px')} 0;

  strong {
    padding-right: ${rem('10px')};

    text-transform: uppercase;
    font-weight: 700;

    color: ${props => props.theme.palette.primary};
  }

  p {
    ${headingLarge}

    margin: 0;

    font-weight: 700;
    text-transform: capitalize;

    color: ${props => props.theme.palette.black};
  }
`

export default StyledInfo
