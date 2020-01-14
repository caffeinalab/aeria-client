import styled from 'styled-components'
import {rem} from 'polished'
import StyledWrapper from '../Picture/StyledWrapper'
import { dashedBorder} from '../../mixins/borders'


export default styled(StyledWrapper)`
  ${dashedBorder}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .DayPicker-Day {
    width: ${rem('40px')};
    height: ${rem('40px')};
  }

  .DayPicker-Day.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside),
  .DayPicker-Day.DayPicker-Day--selected {
    background-color: ${props => props.theme.palette.primary};
  }
`
