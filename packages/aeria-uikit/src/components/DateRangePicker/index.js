import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

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
     * Specifies a unique id for the <input> element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the <input> element.
     */
    label: PropTypes.string,

    /**
     * Specifies the values of the <input>s element.
     */
    value: PropTypes.arrayOf(PropTypes.string),

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * The current index on the form.
     */
    index: PropTypes.number,

    /**
     * Callback function invoked when the value of the <input> has been changed.
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
    this.props.onChange && this.props.onChange({...this.props, ...this.state})
  }

  render() {
    const {id, value = [], error} = this.props

    const { from, to, enteredTo } = this.state
    const modifiers = { start: from, end: enteredTo || to }
    const disabledDays = { before: this.state.from }
    const selectedDays = [from, { from, to: enteredTo || to }]

    return (
      <StyledDateRangePicker error={error}>
        <input type="hidden" hidden name={`${id}-from`} value={value[0] || ''} readOnly/>
        <input type="hidden" hidden name={`${id}-to`} value={value[1] || ''} readOnly/>
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
