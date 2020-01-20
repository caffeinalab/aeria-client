import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import StyledInput from './StyledInput'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

@withLabel
@withValidation
class Input extends PureComponent {
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
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * Specifies the initial value of the `<input>` element.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * Describes the different input types for the `<input>` element.
     */
    type: PropTypes.oneOf([
      'text',
      'email',
      'tel',
      'url',
      'number',
      'hidden'
    ]).isRequired,

    /**
     * Specifies the maximum number of characters allowed in the `<input>` element.
     */
    maxlength: PropTypes.number,

    /**
     * Specifies the minimum number of characters allowed in the `<input>` element.
     */
    minlength: PropTypes.number,

    /**
     * Specifies a regular expression that the `<input>` element's value is checked against on form submission.
     */
    pattern: PropTypes.string,

    /**
     * Specifies whether the element is to have its spelling and grammar checked or not.
     */
    spellcheck: PropTypes.bool,

    /**
     * Specifies that the user is allowed to enter more than one value in the `<input>` element.
     */
    multiple: PropTypes.bool,

    /**
     * Specifies the interval between legal numbers in the `<input>` element.
     */
    step: PropTypes.number,

    /**
     * Specifies the maximum value for the `<input>` element.
     */
    max: PropTypes.number,

    /**
     * Specifies the minimum value for the `<input>` element.
     */
    min: PropTypes.number,

    /**
     * Specifies that the `<input>` field must be filled out before submitting the form.
     */
    required: PropTypes.bool,

    /**
     * Specifies that the `<input>` field is read-only.
     */
    readOnly: PropTypes.bool,

    /**
     * Specifies that the `<input>` field is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Secifies a short hint that describes the expected value of the `<input>` field.
     */
    placeholder: PropTypes.string,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * The current index on the form.
     */
    index: PropTypes.number,

    /**
     * Callback function invoked when the value of the `<input>` has been changed.
     */
    onChange: PropTypes.func.isRequired,
  }

  onChange = ({ target }) => {
    this.props.onChange && this.props.onChange({value: target.value}, this.props)
  }

  render() {
    const {id, value, controlled = false, ...htmlAttributes} = this.props

    return (
      <StyledInput
        id={id}
        value={controlled ? value : undefined}
        defaultValue={!controlled ? value : undefined}
        {...htmlAttributes}
        onBlur={this.props.onBlur}
        onChange={this.onChange}
      />
    )
  }
}

export default Input
