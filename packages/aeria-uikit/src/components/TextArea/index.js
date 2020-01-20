import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import StyledTextArea from './StyledTextArea'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

@withLabel
@withValidation
class Textarea extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the <textarea> element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the <textarea> element.
     */
    label: PropTypes.string.isRequired,

    /**
     * Specifies the value of the <textarea> element.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * Specifies the initial value of the `<input>` element.
     */
    defaultValue: PropTypes.bool,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * Callback function invoked when the value of the <textarea> has been changed.
     */
    onChange: PropTypes.func.isRequired,
  }

  onChange = ({ target }) => {
    this.props.onChange && this.props.onChange({...this.props, value: target.value})
  }

  onBlur = event => {
    this.props.onBlur && this.props.onBlur(event)
  }

  render() {
    const {id, ...htmlAttributes} = this.props

    return (
      <StyledTextArea
        id={id}
        {...htmlAttributes}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    )
  }
}

export default Textarea
