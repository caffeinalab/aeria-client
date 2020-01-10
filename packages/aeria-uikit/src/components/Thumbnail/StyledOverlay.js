import styled from 'styled-components'

const StyledOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	display: flex;
	flex-flow: row wrap;
	justify-content: center;

	transition: opacity .3s;

	opacity: ${props => props.show ? 1 : 0};
	pointer-events: ${props => props.show ? 'all' : 'none'};
`

export default StyledOverlay
