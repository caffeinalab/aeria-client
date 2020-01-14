import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'
import { arrayMove } from 'react-sortable-hoc'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'
import Sortable from '../Sortable'
import Button from '../Button'
import Thumbnail from '../Thumbnail'
import DragHandle from '../DragHandle'
import StyledPicture from './StyledPicture'


import StyledContainer from './StyledContainer'
import StyledContainerButton from './StyledContainerButton'

@withLabel
@withValidation
class Gallery extends PureComponent {
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
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * Defines an array of object (see Thumbnail component).
     */
    children: PropTypes.array,

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
    error: PropTypes.string
  }

  openUploader = (indexImg) => {
    const {options, index} = this.props
    const {label, children = []} = options

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
      multiple: true // Set to true to allow multiple files to be selected
    })

    this.frame.on('open', () =>{
      const selection = this.frame.state().get('selection')
      this.props.options.children.forEach(child => {
        selection.add(wp.media.attachment(child.value))
      })
    })

    // When an image is selected in the media frame...
    this.frame.on('select', () => {
      const {models} = this.frame.state().get('selection')
      const attachments = models.map(element => {
        const attachment = element.toJSON()
        return {
          value: attachment.id,
          url: attachment.url,
        }
      })

      const childrenWithAttachments = [...children, ...attachments]
      this.props.onChange({
        value: childrenWithAttachments.length,
        children: childrenWithAttachments,
      }, index)
    })

    // Finally, open the modal on click
    this.frame.open()
  }

  deletePicture(index) {
    const children = Array.from(this.props.options.children)
    children.splice(index, 1)
    this.props.onChange({
      value: children.length,
      children: children,
    }, this.props.index)
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const children = Array.from(this.props.options.children)
    this.props.onChange({
      value: {
        children: arrayMove(children, oldIndex, newIndex)
      }
    }, this.props.index)
  }

  onEdit = event => {
    this.openUploader(event)
  }

  onDelete = event => {
    this.deletePicture(event)
  }

  renderChild = (element, index) => (
    <StyledPicture>
      <DragHandle />
      <Thumbnail
        editable
        deletable
        index={index}
        id={element.value}
        url={element.url}
        name={`${this.props.id}-${index}-picture`}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
      />
    </StyledPicture>
  )

  render() {
    const {id, value, error, children = [], ctaLabel = 'Add media'} = this.props

    return (
      <Fragment>
        <input
          type="hidden"
          name={id}
          value={value}
          readOnly
        />
        <StyledContainer error={error}>
          <Sortable
            type="grid"
            useDragHandle
            renderChild={this.renderChild}
            children={children}
          />
          <StyledContainerButton>
            <Button onClick={this.openUploader}>
              {ctaLabel}
            </Button>
          </StyledContainerButton>
        </StyledContainer>
      </Fragment>
    )
  }
}

export default Gallery
