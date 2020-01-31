import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'
import klona from 'klona'
import uuid from 'uuid/v4'

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
     * Specifies a unique id for the `<input>` element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Specifies the value of the `<input>` element.
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
    error: PropTypes.string
  }

  static defaultProps = {
    children: []
  }

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value || this.props.children.length,
      children: klona(this.props.children)
    }

    this.state.children.forEach(child => {child._key = uuid()})
  }

  onEdit = e => {
    this.props.onEdit && this.props.onEdit(e, this.state, this.onDataChange)
  }

  onButton = e => {
    this.props.onButton && this.props.onButton(e, this.state, this.onDataChange)
  }

  onDataChange = (data) => {
    this.setState({ ...data }, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(klona(this.state), klona(this.props))
    this.triggerBlur()
  }

  triggerBlur = () => {
    this.props.onBlur && this.props.onBlur({target: {value: this.state.value}}, klona(this.props))
  }

  removeChild = elementProps => {
    const {index} = elementProps
    const value = this.state.value - 1
    const children = this.state.children.reduce((acc, c, i) => {
      i !== index && acc.push(klona(c))
      return acc
    }, [])

    this.onDataChange({value, children})
  }

  renderChild = (element, index) => (
    <StyledPicture>
      <DragHandle />
      <Thumbnail
        editable
        deletable
        index={index}
        value={element.value}
        url={element.url}
        id={`${this.props.id}-${index}-picture`}
        onEdit={this.onEdit}
        onDelete={this.removeChild}
      />
    </StyledPicture>
  )

  render() {
    const {id, validation, error, ctaLabel = 'Add media'} = this.props
    const {value, children} = this.state

    return (
      <StyledContainer
        id={`${id}-focus`}
        error={error}
        tabIndex={-1}
        validation={validation}
        onBlur={this.triggerBlur}
      >
        <input
          type="hidden"
          id={id}
          name={id}
          value={value}
          readOnly
        />
        <Sortable
          type="grid"
          useDragHandle
          renderChild={this.renderChild}
          children={children}
        />
        <StyledContainerButton>
          <Button onClick={this.onButton}>
            {ctaLabel}
          </Button>
        </StyledContainerButton>
      </StyledContainer>
    )
  }
}

export default Gallery
