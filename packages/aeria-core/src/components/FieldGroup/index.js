import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import klona from 'klona'

import Grid from 'styled-components-grid'

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

  getGridSize({ size }) {
    const cleanSize = size && size.replace(/\s+/g, '')

    return {
      lg: sizeAliases[cleanSize] || 1
    }
  }

  onChildChange = (childState, index) => {
    if (!this.props.onChange) {
      return
    }
    const fields = klona(this.props.fields)
    fields[index] = {...fields[index], ...childState}
    this.props.onChange({...this.props, fields})
  }

  shouldShow(field, fields) {
    const { when = false} = field

    return !when || fields.some(f => (
      when.id === f.id
          && (
            typeof when.value === 'string'
              ? when.value === f.value
              : when.value.includes(f.value)
          )
    ))
  }

  getDependencyField(field, fields) {
    const { dependsOn = false} = field

    return !!dependsOn ? fields.find(f => f.id === dependsOn.id) : undefined
  }

  render() {
    const { fields = [] } = this.props

    return <Grid>
      {
        fields
          .filter(f => this.shouldShow(f, fields))
          .map((field, key) => {
            const { type } = field

            const Element = FieldsManager.get(type)
            return <Grid.Unit size={ this.getGridSize(field)} key={key}>
              <Element
                {...field}
                index={key}
                id={`${this.props.id}-${field.id}`}
                onChange={this.onChildChange}
                dependsOnField={this.getDependencyField(field, fields)}
              />
            </Grid.Unit>
          })
      }
    </Grid>
  }
}

export default FieldGroup
