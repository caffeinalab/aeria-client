import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import StyledCheck from './StyledCheck'
import StyledIndicator from './StyledIndicator'
import StyledWrapper from './StyledWrapper'

// import withLabel from '~/hoc/withLabel'
import withValidation from '../../hoc/withValidation'

class Checkbox extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the <input> element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the <input> element.
     */
    label: PropTypes.string.isRequired,

    /**
     * Specifies the value of the <input> element.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * The initial value of the input component.
     */
    defaultValue: PropTypes.bool,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * Callback function invoked when the value of the <input> has been changed.
     */
    onChange: PropTypes.func,
  }

  onChange = ({ target }) => {
    this.props.onChange && this.props.onChange({value: target.checked}, this.props)
  }

  render() {
    const {id, label} = this.props

    return (
      <StyledWrapper htmlFor={id}>
        <StyledCheck
          {...this.props}
          id={id}
          name={id}
          type="checkbox"
          onChange={this.onChange}
        />
        <StyledIndicator name={id} />
        <span style={{marginLeft: '8px', cursor: 'pointer'}}>{label}</span>
      </StyledWrapper>
    )
  }
}

@withValidation
class CheckboxWithValidation extends Checkbox {}

export { Checkbox, CheckboxWithValidation }

export default CheckboxWithValidation
