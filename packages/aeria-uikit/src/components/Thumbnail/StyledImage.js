import styled from 'styled-components'

const StyledImage = styled.div`
	height: 100%;
	width: 100%;
  background-image: url(${props => props.img});
  background-size: contain;
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
`

export default StyledImage
