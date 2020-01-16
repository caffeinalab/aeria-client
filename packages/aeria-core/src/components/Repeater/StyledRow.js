import styled from 'styled-components'
import {rem} from 'polished'
import {solidBorder} from '~/mixins/borders'

const StyledRow = styled.div`
  ${solidBorder}
  position: relative;
  width: 100%;
  display: flex;
  &:nth-child(odd){
    background-color: ${props => props.theme.palette.primaryLight};
  }
  &:nth-child(even){
    background-color: ${props => props.theme.palette.white};
  }
  margin: ${rem('10px')} 0 ${rem('10px')};
  padding-left: ${rem('10px')};
  user-select: none;
  justify-content: space-between;
`

export default StyledRow
