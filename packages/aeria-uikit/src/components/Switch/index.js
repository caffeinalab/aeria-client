import React, {PureComponent, createRef} from 'react'
import PropTypes from 'prop-types'

import StyledCheck from './StyledCheck'
import StyledIndicator from './StyledIndicator'
import StyledWrapper from './StyledWrapper'
import StyledLabel from './StyledLabel'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

const TRUE_VALUES = ['true', true, 1, '1']
const VALID_VALUES = ['true', true, 1, '1', 'false', false, 0, '0']

@withLabel
@withValidation
class Switch extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the `<input>` element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the `<input>` element.
     */
    label: PropTypes.string.isRequired,

    /**
     * Specifies the value of the `<input>` element.
     */
    value: PropTypes.oneOf(VALID_VALUES),

    /**
     * Specifies the initial value of the `<input>` element.
     */
    defaultValue: PropTypes.oneOf(VALID_VALUES),

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * Callback function invoked when the value of the `<input>` has been changed.
     */
    onChange: PropTypes.func,
  }

  constructor() {
    super()
    this.ref = createRef()
  }

  onChange = ({target}) => {
    this.props.onChange && this.props.onChange({value: target.checked}, this.props)
  }

  onBlur = () =>{
    this.props.onBlur && this.props.onBlur({target: {value: this.ref.current.checked}}, this.props)
  }

  render() {
    const {id, value, defaultValue, validation} = this.props

    const defaultChecked = TRUE_VALUES.includes(value || defaultValue)

    return (
      <StyledWrapper
        id={`${id}-focus`}
        tabIndex={0}
        onBlur={this.onBlur}>
        <StyledCheck
          {...this.props}
          id={id}
          name={id}
          ref={this.ref}
          type="checkbox"
          defaultChecked={defaultChecked}
          onChange={this.onChange}
        />
        <StyledLabel
          htmlFor={id}
          name={id}
          validation={validation}
        >
          <StyledIndicator validation={validation}/>
        </StyledLabel>
      </StyledWrapper>
    )
  }
}

export default Switch
