import styled from 'styled-components'
import {rem} from 'polished'

const StyledWrapperCta = styled.div`
  display: flex;

  > * {
    position: relative;

    &:before {
      position: absolute;
      content: '';
      width: ${rem('1px')};;
      height: ${rem('40px')};
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${props => props.theme.palette.primary};
    }

    &:last-child {
      &:before {
        display: none;
      }
    }
  }
`

export default StyledWrapperCta
