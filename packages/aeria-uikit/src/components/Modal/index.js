import React, {Component, Fragment, Children, createRef} from 'react'
import PropTypes from 'prop-types'

import Modal from './Modal'

class AccessibleModal extends Component {
  static propTypes = {
    /**
     * Aria Role
     */
    role: PropTypes.string,
    /**
     * Aria Label
     */
    ariaLabel: PropTypes.string,
    /**
     * The Modal content
     */
    children: PropTypes.node,
    /**
     * A component that accept a label and an onClick prop
     */
    triggerComponent: PropTypes.func,
    /**
     * A custom label for a trigger component
     */
    triggerLabel: PropTypes.string,
  }

  state = {
    isOpen: false
  }

  _refs = {
    modal: createRef(),
  }

  onOpen = () => {
    this.setState({ isOpen: true })
  }

  onClose = () => {
    this.setState({ isOpen: false })
  }

  onClickAway = (e) => {
    if (this._refs.modal.current && this._refs.modal.current.contains(e.target)) {
      return
    }

    this.onClose()
  }

  render() {
    const {isOpen} = this.state
    const {ariaLabel, children, triggerComponent, triggerLabel, role} = this.props
    const ModalTrigger = triggerComponent

    const childrenWithClose = Children.map(children, child =>
      React.cloneElement(child, { onCloseModal: this.onClose })
    )

    return (
      <Fragment>
        {
          <ModalTrigger
            label={triggerLabel}
            onClick={this.onOpen}
          />
        }
        {isOpen &&
          <Modal
            role={role}
            ariaLabel={ariaLabel}
            modalRef={this._refs.modal}
            onClick={this.onClickAway}
            onClose={this.onClose}
          >
            {childrenWithClose}
          </Modal>
        }
      </Fragment>
    )
  }
}

export default AccessibleModal
