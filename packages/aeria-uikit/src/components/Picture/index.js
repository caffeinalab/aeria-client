import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Button from '~/components/Button'
import Thumbnail from '~/components/Thumbnail'

import StyledContainer from './StyledContainer'

import withLabel from '~/hoc/withLabel'
import withValidation from '~/hoc/withValidation'

@withLabel
@withValidation
class Picture extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the <input> element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Specifies the value of the <input> element.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Specifies the initial value of the <input> element.
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
     * Defines a label for the <input> element.
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

    /**
     * The current index on the form.
     */
    index: PropTypes.number,
  }

  static defaultProps = {
    ctaLabel: 'Add Media'
  }

  openUploader = (event) => {
    const {options, index} = this.props
    const {label} = options
    // If the media frame already exists, reopen it.
    if (this.frame) {
      this.frame.open()
      return
    }

    if (!window.wp || !window.wp.media) {
      throw new Error('wp.media doesn\'t exixt!')
    }

    // Create a new media frame
    this.frame = window.wp.media({
      title: `${label}`,
      multiple: false // Set to true to allow multiple files to be selected
    })

    this.frame.on('open', () =>{
      const {value, defaultValue} = this.props.options
      const selection = this.frame.state().get('selection')
      selection.add(wp.media.attachment(value !== undefined ? value : defaultValue))
    })

    // When an image is selected in the media frame...
    this.frame.on('select', () => {
      // Get media attachment details from the frame state
      const attachment = this.frame.state().get('selection').first().toJSON()

      this.props.onChange({
        value: attachment.id,
        url: attachment.url
      }, index)
    })

    // Finally, open the modal on click
    this.frame.open()
  }

  deletePicture = () => {
    this.props.onChange({
      value: null
    }, this.props.index)
  }

  onEdit = event => {
    this.openUploader(event)
  }

  onDelete = event => {
    this.deletePicture(event)
  }

  render() {
    const {id, value, url, error, ctaLabel} = this.props

    return (
      <StyledContainer error={error}>
        {
          value ? (
            <Thumbnail
              editable
              deletable
              expandable
              id={value}
              url={url || value}
              name={id}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
            />
          ) : (
            <Button onClick={(e) => this.openUploader(e)}>
              {ctaLabel}
            </Button>
          )
        }
      </StyledContainer>
    )
  }
}

export default Picture
