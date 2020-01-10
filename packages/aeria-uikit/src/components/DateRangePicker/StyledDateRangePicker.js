import styled from 'styled-components'
import {rem} from 'polished'
import StyledWrapper from '~/components/Picture/StyledWrapper'
import { dashedBorder} from '~/mixins/borders'


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

  .DayPicker-Day.DayPicker-Day--selected.DayPicker-Day--start {
    border-radius: 0;
    border-top-left-radius: 100%;
    border-bottom-left-radius: 100%;
  }

  .DayPicker-Day.DayPicker-Day--selected.DayPicker-Day--end {
    border-radius: 0;
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  .DayPicker-Day.DayPicker-Day--selected.DayPicker-Day--start.DayPicker-Day--end {
    border-radius: 100%;
  }

  .DayPicker-Day.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside),
  .DayPicker-Day.DayPicker-Day--selected {
    background-color: ${props => props.theme.palette.primary};
  }

  .DayPicker-Day.DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end) {
    background: #f0f8ff;
    border-radius: 0;
    color: currentColor;
    background-color: ${props => props.theme.palette.primaryLight};
  }
`
