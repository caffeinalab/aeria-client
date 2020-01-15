import React, {PureComponent, Fragment} from 'react'
import klona from 'klona'
import { Button, Sortable, withLabel } from '@aeria/uikit'

import RepeaterRow from './RepeaterRow'
import StyledContainerContent from './StyledContainerContent'
import StyledContainerButton from './StyledContainerButton'

@withLabel
class Repeater extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || 0,
      children: props.children || []
    }
  }

  addChild = () => {
    const value = this.state.value + 1
    const children = klona(this.state.children)
    children.push(klona(this.props.fields))
    this.setState({value, children}, () => {
      this.props.onChange && this.props.onChange(this.state)
    })
  }

  removeChild = (index) => {
    const value = this.state.value - 1
    const children = this.state.children.reduce((acc, c, i) => {
      i !== index && acc.push(klona(c))
      return acc
    }, [])

    this.setState({value, children}, () => {
      this.props.onChange && this.props.onChange(this.state)
    })
  }

  onChildChange = (childState, index) => {
    const children = klona(this.state.children)
    children[index] = childState
    this.setState({children}, () => {
      this.props.onChange && this.props.onChange(this.state, this.props.index)
    })
  }

  renderChild = (element, index) => (
    <RepeaterRow
      index={index}
      id={`${this.props.id}-${index}`}
      fields={element}
      onChange={this.onChildChange}
      onDeleteButton={this.removeChild}
    />
  )

  render() {
    const {id, ctaLabel} = this.props
    const {value, children} = this.state

    return <Fragment>
      <input
        type="hidden"
        name={id}
        value={value}
        readOnly
      />
      <StyledContainerContent>
        <Sortable
          useDragHandle
          renderChild={this.renderChild}
          children={children}
        />
      </StyledContainerContent>
      <StyledContainerButton>
        <Button
          withIcon="add"
          onClick={this.addChild}
          type="button">
          {ctaLabel}
        </Button>
      </StyledContainerButton>
    </Fragment>
  }
}


export default Repeater
