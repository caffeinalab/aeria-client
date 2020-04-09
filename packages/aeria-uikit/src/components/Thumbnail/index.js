import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StyledPicture from './StyledPicture'
import StyledOverlay from './StyledOverlay'
import StyledAction from './StyledAction'
import StyledImage from './StyledImage'
import StyledFileName from './StyledFileName'

class Thumbnail extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    thumbSize: PropTypes.oneOf([
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
    thumbSize: 'normal',
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
    const { id, value, url, fileName = '', showFilename = false, naturalSize = false, thumbSize, editable, deletable, expandable} = this.props

    return (
      <StyledPicture
        size={thumbSize}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.handleLeave}
        onFocus={this.onMouseEnter}
        onBlur={this.handleLeave}
      >
        <input
          type="hidden"
          id={id}
          name={id}
          value={value}
          readOnly
        />
        {
          showFilename && fileName &&
            <StyledFileName>
              {fileName}
            </StyledFileName>
        }
        <StyledOverlay
          tabIndex={-1}
          show={(deletable || editable || expandable) && this.state.show}
        >
          {deletable && <StyledAction type="button" onClick={() => this.props.onDelete(this.props)}>Delete</StyledAction>}
          {editable && <StyledAction type="button" onClick={() => this.props.onEdit(this.props)}>Edit</StyledAction>}
        </StyledOverlay>
        <StyledImage
          naturalSize={naturalSize}
          img={url}
        />
      </StyledPicture>
    )
  }
}

export default Thumbnail
