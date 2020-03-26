import styled from 'styled-components'
import {rem} from 'polished'

const StyledFileName = styled.div`
	position: absolute;

	bottom:0;
	left:0;
	right: 0;
	overflow: hidden;
	border: 1px solid ${props => props.theme.palette.greyLight};
	background: ${props => props.theme.palette.white};
	text-align: center;
	text-transform: uppercase;
	font-size: ${rem('12px')};
`

export default StyledFileName
