import React, {Component, Children, createRef} from 'react'
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'
import FocusTrap from 'focus-trap-react'
import {enableBodyScroll, disableBodyScroll} from 'body-scroll-lock'

import StyledClose from './StyledClose'
import StyledContent from './StyledContent'
import StyledModal from './StyledModal'

class Modal extends Component {
  static propTypes = {
    role: PropTypes.string,
    ariaLabel: PropTypes.string,
    modalRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.object })
    ]),
    children: PropTypes.node,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
  }

  componentDidMount() {
    disableBodyScroll(this._refs.container.current)
  }

  componentWillUnmount() {
    enableBodyScroll(this._refs.container.current)
  }

  _refs = {
    container: createRef(),
  }

  render() {
    const {role, ariaLabel, modalRef, children, onClick, onClose} = this.props
    return createPortal(
      <FocusTrap focusTrapOptions={{ onDeactivate: onClose }}>
        <StyledModal
          role={role}
          aria-modal="true"
          aria-label={ariaLabel}
          ref={this._refs.container}
          onClick={onClick}
        >
          <StyledContent ref={modalRef}>
            <StyledClose
              type="button"
              aria-label="Close"
              withIcon="close"
              onClick={onClose}
            />
            {Children.toArray(children)}
          </StyledContent>
        </StyledModal>
      </FocusTrap>,
      document.body
    )
  }
}

export default Modal
