import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import klona from 'klona'

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

import StyledDatePicker from './StyledDatePicker'

const formatDate = date => date.toISOString().substring(0, 10)
@withLabel
@withValidation
class DatePicker extends PureComponent {
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
     * Specifies the value of the `<input>` element.
     */
    value: PropTypes.string,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * Callback function invoked when the value of the `<input>` has been changed.
     */
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { value: props.value }
  }

  onChange = (date) => {
    this.setState({value: formatDate(date)}, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(klona(this.state), klona(this.props))
    this.triggerBlur()
  }

  triggerBlur = () => {
    this.props.onBlur && this.props.onBlur({target: {value: this.state.value}}, klona(this.props))
  }

  render() {
    const {id, validation, error } = this.props
    const {value} = this.state

    return (
      <StyledDatePicker
        id={`${id}-focus`}
        error={error}
        tabIndex={-1}
        validation={validation}
        onBlur={this.triggerBlur}
      >
        <input type="hidden" hidden id={id} name={id} value={value || ''} readOnly/>
        <DayPicker
          onDayClick={this.onChange}
          selectedDays={value ? new Date(value) : null}
        />
      </StyledDatePicker>
    )
  }
}

export default DatePicker
