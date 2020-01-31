import React, { PureComponent} from 'react'
import { SortableContainer, SortableElement} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import klona from 'klona'

const SortableItem = SortableElement(({element}) => element)

const SortableList = SortableContainer(({items, type})=>{
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
  return <div style={style}>{items}</div>
})

export default class Sortable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      children: props.children
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    return {
      shouldUpdateChildren: JSON.stringify(this.state.children) !== JSON.stringify(this.props.children)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!snapshot.shouldUpdateChildren) {
      return
    }
    this.setState({ children: this.props.children })
  }

  get items() {
    return this.state.children.map((child, index) => (
      <SortableItem
        key={child._key || child.id + index}
        index={index}
        element={this.props.renderChild(child, index)}
      />
    ))
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const children = klona(this.state.children)
    arrayMove.mutate(children, oldIndex, newIndex)
    this.setState({children}, () => {
      this.props.onChange && this.props.onChange({
        children: this.state.children
      })
    })
  }

  render() {
    const {type, useDragHandle } = this.props
    const axis = type === 'grid' ? 'xy' : 'y'

    return (
      <SortableList axis={axis}
        type={type}
        distance={10}
        items={this.items}
        onSortEnd={this.onSortEnd}
        useDragHandle={useDragHandle}
      />
    )
  }
}

