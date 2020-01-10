import styled from 'styled-components'
import {rem} from 'polished'

import {solidBorder} from '~/mixins/borders'
import {headingMedium} from '~/mixins/typography'

export default styled.textarea`
  ${headingMedium}
  ${solidBorder}

  display: block;
  width: 100%;
  min-height: ${rem('200px')};

  padding: ${rem('10px')} ${rem('15px')};

  font-weight: 700;

  color: ${props => props.theme.palette.black};
  outline: none;
  background: ${props => props.error ? props.theme.palette.errorBg : props.theme.palette.white};

  &:focus {
    border-color: ${props => props.error ? props.theme.palette.errorMain : props.theme.palette.primary}
  }
`
