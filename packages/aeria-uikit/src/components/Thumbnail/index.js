import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StyledPicture from './StyledPicture'
import StyledOverlay from './StyledOverlay'
import StyledAction from './StyledAction'
import StyledImage from './StyledImage'

class Thumbnail extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.oneOf([
      'small',
      'normal',
      'big'
    ]),
    editable: PropTypes.bool,
    deletable: PropTypes.bool,
    expandable: PropTypes.bool,
    edit: PropTypes.func,
    delete: PropTypes.func,
    expand: PropTypes.func
  }

  static defaultProps = {
    size: 'normal',
    editable: false,
    deletable: false,
    expandable: false
  }

  state = {
    show: false
  }

  onMouseEnter = () => {
    this.setState({
      show: true
    })
  }

  handleLeave = () => {
    this.setState({
      show: false
    })
  }

  render() {
    const {name, index,  id, url, size, editable, deletable, expandable} = this.props

    return (
      <StyledPicture
        size={size}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.handleLeave}
        onFocus={this.onMouseEnter}
        onBlur={this.handleLeave}
      >
        <input
          type="hidden"
          name={`${name}`}
          value={id}
          readOnly
        />
        <StyledOverlay
          tabIndex="0"
          show={(deletable || editable || expandable) && this.state.show}
        >
          {deletable && <StyledAction type="button" onClick={() => this.props.onDelete(index)}>Delete</StyledAction>}
          {editable && <StyledAction type="button" onClick={() => this.props.onEdit(index)}>Edit</StyledAction>}
        </StyledOverlay>
        <StyledImage img={url} />
      </StyledPicture>
    )
  }
}

export default Thumbnail
