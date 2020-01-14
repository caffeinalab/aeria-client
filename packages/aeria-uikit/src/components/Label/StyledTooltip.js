import styled from 'styled-components'
import {rem} from 'polished'

import {solidBorder} from '../../mixins/borders'
import {defaultText} from '../../mixins/typography'

const StyledTooltip = styled.span`
  ${solidBorder}

  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: ${rem('20px')};
  width: ${rem('20px')};

  border-radius: 100%;

  margin-left: ${rem('5px')};

  cursor: pointer;

  color: ${props => props.theme.palette.white};
  background-color: ${props => props.theme.palette.primary};

  &:before {
    ${defaultText}
    display: none;
    position: absolute;
    min-width: ${rem('200px')};
    max-width: ${rem('358px')};

    background: white;
    box-shadow: 0 ${rem('5px')} ${rem('25px')} 0 rgba(0,0,0,0.1);

    top: 0px;
    left: calc(100% + 12px);

    padding: ${rem('16px')} ${rem('27px')} ;

    color: #5b5b5b;
    z-index: 3;
    text-transform: none;

    content: "${props => props.description}";
    border: 1px solid ${props => props.theme.palette.grey};
    margin-top: ${props => props.type === 'strong' ? '-1px' : '1px'};
  }

  &:hover {
    ${solidBorder}
    border-radius: 50%;
    background-color: ${props => props.theme.palette.primary};
    color: white;

    &:before {
      display:block;
    }
  }
`

export default StyledTooltip
