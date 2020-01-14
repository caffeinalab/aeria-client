import styled from 'styled-components'
import {rem} from 'polished'

const SIZES = {
  small: rem('100px'),
  normal: rem('200px'),
  big:	rem('300px')
}

const StyledPicture = styled.div`
	position: relative;

	width: ${props => SIZES[props.size]};
	height: ${props => SIZES[props.size]};
	/* margin: ${rem('10px')}; */

	overflow: hidden;
	border: 1px solid ${props => props.theme.palette.greyLight};
`

export default StyledPicture
