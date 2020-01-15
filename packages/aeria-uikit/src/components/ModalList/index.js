import React, {Fragment, Component} from 'react'

import Info from '../Info'
import Item from './item'
import StyledList from './StyledList'

class ModalList extends Component {
  render() {
    const {items = [], onItemClick} = this.props

    return (
      <Fragment>
        <Info>Select the desired section type!</Info>
        <StyledList>
          {
            items.map((item, key) => (
              <Item
                key={key}
                config={item}
                onClick={onItemClick}
              />
            ))
          }
        </StyledList>
      </Fragment>
    )
  }
}
export default ModalList
