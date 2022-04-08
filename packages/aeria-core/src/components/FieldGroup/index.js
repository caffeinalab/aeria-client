import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import klona from 'klona'

import Grid from 'styled-components-grid'

import isFieldEnabled from '../../utils/is-field-enabled'
import FieldsManager from '../FieldsManager'

const sizeAliases = {
  half: 0.50,
  quarter: 0.25,
  third: 0.333334,
  twoThirds: 0.666667,
  threeQuarters: 0.75
}

class FieldGroup extends PureComponent {
  static propTypes = {
    /**
     * Specifies the id prepended to input children's id.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines the fields of this group.
     */
    fields: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props)

    this.state = {
      valueToFetch: null
    }
  }

  getGridSize({ size }) {
    const cleanSize = size && size.replace(/\s+/g, '')

    return {
      lg: sizeAliases[cleanSize] || 1
    }
  }

  onChildChange = (childState, childProps) => {
    if (!this.props.onChange) {
      return
    }

    const fields = klona(this.props.fields)
    fields[childProps.index] = {...fields[childProps.index], ...childState}
    this.props.onChange({fields}, this.props)
  }

  getDependencyField(field, fields) {
    const { dependsOn = false} = field

    return !!dependsOn ? fields.find(f => f.id === dependsOn.id) : undefined
  }

  render() {
    const { fields = [] } = this.props

    return (
      <Grid>
        {
          fields
            .reduce((acc, field, key) => {
              if (!isFieldEnabled(field, fields)) {
                return acc
              }

              const { type } = field
              const Element = FieldsManager.get(type)

              acc.push(
                <Grid.Unit size={ this.getGridSize(field)} key={key}>
                  <Element
                    {...field}
                    index={key}
                    groupID={this.props.id}
                    id={`${this.props.id}-${field.id}`}
                    onChange={this.onChildChange}
                    dependsOnField={this.getDependencyField(field, fields)}
                    valueToFetch={this.state.valueToFetch}
                    updateValueToFetch={(value) => this.setState({valueToFetch: value})}
                  />
                </Grid.Unit>
              )
              return acc
            }, [])
        }
      </Grid>
    )
  }
}

export default FieldGroup
