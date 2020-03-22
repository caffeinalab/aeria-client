import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'
import klona from 'klona'
import { Button, Sortable, withLabel, Info } from '@aeria/uikit'

import RepeaterRow from './RepeaterRow'
import StyledContainerContent from './StyledContainerContent'
import StyledContainerButton from './StyledContainerButton'
import uuid from 'uuid'

@withLabel
class Repeater extends PureComponent {
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
     * Defines the minimum children size.
     */
    min: PropTypes.number,


    /**
     * Defines the maximum children size.
     */
    max: PropTypes.number,

    /**
     * Defines the fields of this group.
     */
    fields: PropTypes.arrayOf(PropTypes.object),

    /**
     * Defines the extra labels.
     */
    secondaryLabels: PropTypes.shape({
      minError: PropTypes.string,
      maxError: PropTypes.string
    }),
  }

  static defaultProps = {
    value: 0,
    children: [],
    min: 0,
    max: Infinity,
    secondaryLabels: {
      minError: 'You have reached the minimum size',
      maxError: 'You have reached the maximum size'
    }
  }

  constructor(props) {
    super(props)
    const children = this.getInitialChildren(props)

    this.state = {
      value: children.length,
      children
    }
  }

  getInitialChildren({ fields, children, min, max }) {
    let ensuredChildren = klona(children).map(child => this.wrapChild(child))
    for (let i = ensuredChildren.length; i < min; i++) {
      ensuredChildren.push(this.wrapChild(klona(fields)))
    }

    if (max < ensuredChildren.length) {
      ensuredChildren = ensuredChildren.slice(max - 1, ensuredChildren.length - 1)
    }
    return ensuredChildren
  }

  wrapChild(fields) {
    return {
      _key: uuid(),
      fields
    }
  }

  addChild = () => {
    const value = this.state.value + 1
    if (value > this.props.max) {
      this.setState({sizeError: this.props.secondaryLabels.maxError}, this.triggerChange)
      return
    }
    const children = klona(this.state.children)
    children.push(this.wrapChild(klona(this.props.fields)))
    this.setState({value, children, sizeError: undefined}, this.triggerChange)
  }

  removeChild = (index) => {
    const value = this.state.value - 1

    if (value < this.props.min) {
      this.setState({sizeError: this.props.secondaryLabels.minError}, this.triggerChange)
      return
    }
    const children = this.state.children.reduce((acc, c, i) => {
      i !== index && acc.push(klona(c))
      return acc
    }, [])

    this.setState({value, children, sizeError: undefined}, this.triggerChange)
  }

  onChildChange = (childState, childProps) => {
    const children = klona(this.state.children)
    children[childProps.index].fields = childState.fields
    this.setState({children}, this.triggerChange)
  }

  onSortChange = ({children}) => {
    this.setState({children}, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(this.state, this.props)
  }

  renderChild = ({fields}, index) => (
    <RepeaterRow
      index={index}
      id={`${this.props.id}-${index}`}
      fields={fields}
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
          id={id}
          useDragHandle
          renderChild={this.renderChild}
          onChange={this.onSortChange}
          children={children}
        />
      </StyledContainerContent>
      {this.state.sizeError && <Info type="error">{this.state.sizeError}</Info>}
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
