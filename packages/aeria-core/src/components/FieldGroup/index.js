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

  onChildChange = (childState, childProps) => {
    if (!this.props.onChange) {
      return
    }

    const fields = klona(this.props.fields)
    fields[childProps.index] = {...fields[childProps.index], ...childState}
    this.props.onChange({fields}, this.props)
  }

  shouldShow(field, fields) {
    const { when = false } = field

    return !when || fields.some(f => {
      const value = (f.value !== undefined && f.value !== null) ? f.value : f.defaultValue
      return (
        when.id === f.id
            && (
              typeof when.value === 'string'
                ? when.value === value
                : when.value.includes(value)
            )
      )
    })
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
          .reduce((acc, field, key) => {
            if (!this.shouldShow(field, fields)) {
              return acc
            }

            const { type } = field
            const Element = FieldsManager.get(type)

            acc.push(
              <Grid.Unit size={ this.getGridSize(field)} key={key}>
                <Element
                  {...field}
                  index={key}
                  id={`${this.props.id}-${field.id}`}
                  onChange={this.onChildChange}
                  dependsOnField={this.getDependencyField(field, fields)}
                />
              </Grid.Unit>
            )
            return acc
          }, [])
      }
    </Grid>
  }
}

export default FieldGroup
