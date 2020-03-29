import styled from 'styled-components'

const StyledImage = styled.div`
	height: 100%;
	width: 100%;
  background-image: url(${props => props.img});
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${props => props.naturalSize ? 'auto' : 'contain'}
`

export default StyledImage
