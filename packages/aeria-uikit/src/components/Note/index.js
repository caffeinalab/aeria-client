import styled from 'styled-components'
import styledMap from 'styled-map'
import {rem} from 'polished'

import {headingExtraSmall} from '../../mixins/typography'

const Note = styled.span`
    ${headingExtraSmall}

    margin-top: ${rem('5px')};
    font-weight: 700;

    color: ${props => styledMap`
      error: ${props.theme.palette.errorMain};
      default: ${props.theme.palette.secondary};
    `};

    float: ${props => props.position ? props.position : 'left'};
`

export default Note
