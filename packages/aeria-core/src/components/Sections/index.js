import React, {PureComponent, Fragment} from 'react'
import klona from 'klona'
import { Sortable, withLabel } from '@aeria/uikit'
import StyledContainerList from './StyledContainerList'
import Cta from './Cta'
import Section from './Section'

@withLabel
class Sections extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || 0,
      children: props.children || []
    }
  }

  addChild = (e) => {
    const value = this.state.value + 1
    const children = klona(this.state.children)
    children.push(e)
    this.setState({value, children}, this.triggerChange)
  }

  removeChild = (index) => {
    const value = this.state.value - 1
    const children = this.state.children.reduce((acc, c, i) => {
      i !== index && acc.push(klona(c))
      return acc
    }, [])

    this.setState({value, children}, this.triggerChange)
  }

  onChildChange = (childState) => {
    const children = klona(this.state.children)
    children[childState.index].fields = childState.fields
    this.setState({children}, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(this.state, this.props)
  }

  renderChild = (element, index) => (
    <Section
      {...element}
      index={index}
      id={`${this.props.id}-${index}`}
      onChange={this.onChildChange}
      onDeleteButton={this.removeChild}
    />
  )

  render() {
    const {id} = this.props
    const {value, children} = this.state

    return (
      <Fragment>
        <input
          type="hidden"
          name={id}
          value={value}
          readOnly
        />
        <StyledContainerList>
          <Sortable
            useDragHandle
            renderChild={this.renderChild}
            children={children}
          />
        </StyledContainerList>
        <Cta
          {...this.props}
          onClick={this.addChild}
        />
      </Fragment>
    )
  }
}

export default Sections
