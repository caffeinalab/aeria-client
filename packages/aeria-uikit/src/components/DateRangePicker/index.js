import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import klona from 'klona'

import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

import StyledDateRangePicker from './StyledDateRangePicker'

const formatDate = date => date.toISOString().substring(0, 10)
@withLabel
@withValidation
class DateRangePicker extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the `<input>` element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the `<input>` element.
     */
    label: PropTypes.string,

    /**
     * Specifies the values of the `<input>`s element.
     */
    value: PropTypes.arrayOf(PropTypes.string),

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * Callback function invoked when the value of the `<input>` has been changed.
     */
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || [],
      from: props.value ? new Date(props.value[0]) : undefined,
      to: props.value ? new Date(props.value[1]) : undefined,
      enteredTo: undefined
    }
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
    const isRangeSelected = from && to
    return !from || isBeforeFirstDay || isRangeSelected
  }

  onDayClick = (day) => {
    const { from, to } = this.state

    if (from && to && day >= from && day <= to) {
      this.onResetClick()
      return
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      }, this.triggerChange)
    } else {
      this.setState({
        value: [formatDate(from), formatDate(day)],
        to: day,
        enteredTo: day,
      }, this.triggerChange)
    }
  }

  onDayMouseEnter = (day) => {
    const { from, to } = this.state
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({ enteredTo: day }, this.triggerChange)
    }
  }

  onResetClick = _ => {
    this.setState({from: void 0, to: void 0}, this.triggerChange)
  }

  onInputChange = e => {
    e.preventDefault()
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(klona(this.state), klona(this.props))
    this.triggerBlur()
  }

  triggerBlur = () => {
    this.props.onBlur && this.props.onBlur({target: {value: this.state.value}}, klona(this.props))
  }

  render() {
    const {id, validation, error} = this.props
    const { value, from, to, enteredTo } = this.state
    const modifiers = { start: from, end: enteredTo || to }
    const disabledDays = { before: this.state.from }
    const selectedDays = [from, { from, to: enteredTo || to }]

    return (
      <StyledDateRangePicker
        id={`${id}-focus`}
        error={error}
        tabIndex={-1}
        validation={validation}
        onBlur={this.triggerBlur}
      >
        <input type="hidden" hidden id={`${id}-from`} name={`${id}-from`} value={value[0] || ''} readOnly/>
        <input type="hidden" hidden id={`${id}-to`} name={`${id}-to`} value={value[1] || ''} readOnly/>
        <DayPicker
          className="Range"
          numberOfMonths={2}
          fromMonth={from}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayMouseEnter={this.onDayMouseEnter}
          onDayClick={this.onDayClick}
        />
      </StyledDateRangePicker>
    )
  }
}

export default DateRangePicker
