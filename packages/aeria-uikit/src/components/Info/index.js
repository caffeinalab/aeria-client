import styled from 'styled-components'
import {rem} from 'polished'

import {dashedBorder} from '~/mixins/borders'

const StyledInfo = styled.div`
  ${dashedBorder}
	display: flex;
	justify-content: center;
	align-items: center;

  width: 100%;

  padding: ${rem('20px')};
	margin: 0 ${rem('10px')} ${rem('20px')} 0;

	font-size: 1rem;

	background: ${props => props.type === 'error'	?
    props.theme.palette.errorBg : props.theme.palette.primaryLight};
	color: ${props => props.type === 'error'	?
    props.theme.palette.errorMain : props.theme.palette.black};
`

export default StyledInfo
