import React from 'react'
import FieldGroup from '../FieldGroup'

const propsToForm = [
  {
    id: 'lat',
    type: 'number',
    size: 'half'
  },
  {
    id: 'lng',
    type: 'number',
    size: 'half'
  },
  {
    id: 'route',
    type: 'text',
    size: 'half'
  },
  {
    id: 'streetNumber',
    type: 'text',
    size: 'half'
  },
  {
    id: 'locality',
    type: 'text',
    size: 'half'
  },
  {
    id: 'region',
    type: 'text',
    size: 'half'
  },
  {
    id: 'country',
    type: 'text',
    size: 'half'
  },
  {
    id: 'postalCode',
    type: 'text',
    size: 'half'
  }
]

export default function AddressComponents({id, value, labels, onChange}) {
  const fields = propsToForm.map(f => ({
    ...f,
    controlled: true,
    value: value[f.id],
    label: labels[f.id] || f.label
  }))

  return <FieldGroup id={id} onChange={onChange} fields={fields}/>
}
