import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

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
     * Specifies a unique id for the <input> element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the <input> element.
     */
    label: PropTypes.string,

    /**
     * Specifies the value of the <input> element.
     */
    value: PropTypes.string,

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
    onChange: PropTypes.func,
  }

  onInputChange = e => {
    e.preventDefault()
  }

  onChange = (date) => {
    this.props.onChange && this.props.onChange({value: formatDate(date)}, this.props)
  }

  render() {
    const {id, value, error } = this.props

    const selectedDays = value ? new Date(value) : null

    return (
      <StyledDatePicker error={error}>
        <input type="hidden" hidden name={id} value={value || ''} readOnly/>
        <DayPicker
          onDayClick={this.onChange}
          selectedDays={selectedDays}
        />
      </StyledDatePicker>
    )
  }
}

export default DatePicker
