import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import Thumbnail from '../Thumbnail'

import StyledContainer from './StyledContainer'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

@withLabel
@withValidation
class Picture extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the `<input>` element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Specifies the value of the `<input>` element.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Specifies the initial value of the `<input>` element.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Specifies the picture url if different from value.
     */
    url: PropTypes.string,

    /**
     * Defines a label for the `<input>` element.
     */
    label: PropTypes.string,

    /**
     * Defines a label for the <button> element.
     */
    ctaLabel: PropTypes.string,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,
  }

  static defaultProps = {
    ctaLabel: 'Add Media'
  }

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || null,
      url: this.props.url || this.props.value || null
    }
  }

  onEdit = e => {
    this.props.onEdit && this.props.onEdit(e, this.state, this.onDataChange)
  }

  onDelete = () => {
    this.onDataChange({ value: null, url: null })
  }

  onButton = e => {
    this.props.onButton && this.props.onButton(e, this.state, this.onDataChange)
  }

  onDataChange(data) {
    this.setState({ ...data }, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(this.state, this.props)
  }

  render() {
    const {id, error, ctaLabel} = this.props
    const {value, url} = this.state

    return (
      <StyledContainer error={error}>
        {
          value ? (
            <Thumbnail
              editable
              deletable
              expandable
              id={id}
              url={url}
              value={value}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
            />
          ) : (
            <Button onClick={this.onButton}>
              {ctaLabel}
            </Button>
          )
        }
      </StyledContainer>
    )
  }
}

export default Picture
