import styled from 'styled-components'

const StyledCheck = styled.input`
  position: absolute;

  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);

  width: 1px;
  height: 1px;
  padding: 0;

  border: 0;
`

export default StyledCheck
