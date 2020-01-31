import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'
import klona from 'klona'
import uuid from 'uuid/v4'
import { Sortable, withLabel } from '@aeria/uikit'
import StyledContainerList from './StyledContainerList'
import Cta from './Cta'
import Section from './Section'
@withLabel
class Sections extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the `<input>` element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the `<input>` element.
     */
    label: PropTypes.string,

    /**
     * Defines a description for the `<input>` element.
     */
    description: PropTypes.string,

    /**
     * Defines the section type allowed.
     */
    accepts: PropTypes.arrayOf(PropTypes.string),
  }

  constructor(props) {
    super(props)

    this.state = {
      value: klona(props.value) || [],
      children: klona(props.children) || []
    }
    this.state.children.forEach(child => {child._key = uuid()})
  }

  addChild = (child) => {
    const value = klona(this.state.value)
    const children = klona(this.state.children)
    const newChild = klona(child)
    newChild._key = uuid()
    value.push(newChild.id)
    children.push(newChild)
    this.setState({value, children}, this.triggerChange)
  }

  removeChild = (index) => {
    const value = klona(this.state.value)
    value.splice(index, 1)
    const children = this.state.children.reduce((acc, c, i) => {
      i !== index && acc.push(klona(c))
      return acc
    }, [])

    this.setState({value, children}, this.triggerChange)
  }

  onChildChange = (childState, childProps) => {
    const children = klona(this.state.children)
    children[childProps.index] = { ...children[childProps.index], ...childState }
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
    const inputValue = value && typeof value === 'object' ? value.join(',') : value
    return (
      <Fragment>
        <input
          type="hidden"
          id={id}
          name={id}
          value={inputValue}
          readOnly
        />
        <StyledContainerList>
          <Sortable
            useDragHandle
            children={children}
            renderChild={this.renderChild}
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
