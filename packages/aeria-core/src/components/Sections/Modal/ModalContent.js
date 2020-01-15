import React, { Component} from 'react'
import {ModalList} from '@aeria/uikit'

import Context from '../../Context'

class ModalContent extends Component {
  static contextType = Context

  get items() {
    const {sectionTypes = {}} = this.context
    const {acceptedTypes = []} = this.props

    return acceptedTypes.map((id) => sectionTypes[id])
  }

  onItemClick = (e) => {
    this.props.onClickChild && this.props.onClickChild(e)
    this.props.onCloseModal && this.props.onCloseModal()
  }

  render() {
    return (
      <ModalList
        items={this.items}
        onItemClick={this.onItemClick}
      />
    )
  }
}
export default ModalContent
