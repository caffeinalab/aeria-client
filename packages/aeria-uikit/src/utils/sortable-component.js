import React, { Component } from 'react'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'


const SortableItem = SortableElement(({element, index}) => {
  return element
})

const SortableList = SortableContainer(({children, type})=>{
  let style = {
    width: '100%'
  }
  if (type === 'grid') {
    style = Object.assign({
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexFlow: 'row wrap',
    }, style)
  }
  return <div style={style} type={type}>{
    children.props.children.map((element, index)=>{
      return <SortableItem key={`gridrepetitor--${index}`} index={index}  element={element} />
    })
  }</div>
})

export default class SortableComponent extends Component {
  render() {
    const props = this.props
    const axis = props.type === 'grid' ? 'xy' : 'y'
    return <SortableList axis={axis}
      type={this.props.type}
      onSortEnd={props.onSortEnd}
      useDragHandle={props.useDragHandle}
      children={props.children}
      distance={10}
    />
  }
}
