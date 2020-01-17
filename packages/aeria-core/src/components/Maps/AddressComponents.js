import React from 'react'
import {withLabel, StyledInput} from '@aeria/uikit'
import FieldGroup from '../FieldGroup'

const propsToForm = [
  {
    propID: 'lat',
    field: {
      'id': 'lat',
      'label': 'Latitude',
      'type': 'number',
      'size': 'half'
    }
  },
  {
    propID: 'lng',
    field: {
      'id': 'lng',
      'label': 'Longitude',
      'type': 'number',
      'size': 'half'
    }
  },
  {
    propID: 'address',
    field: {
      'id': 'address',
      'label': 'Full Address',
      'type': 'text',
    }
  },
]

const placeToForm = {
  street_number: {
    key: 'short_name',
    field: {
      'id': 'street_number',
      'label': 'street_number',
      'type': 'text',
      'size': 'half'
    },
  },
  route: {
    key: 'long_name',
    field: {
      'id': 'route',
      'label': 'route',
      'type': 'text',
      'size': 'half'
    },
  },
  locality: {
    key: 'long_name',
    field: {
      'id': 'locality',
      'label': 'locality',
      'type': 'text',
      'size': 'half'
    },
  },
  administrative_area_level_1: {
    key: 'short_name',
    field: {
      'id': 'region',
      'label': 'region',
      'type': 'text',
      'size': 'half'
    },
  },
  country: {
    key: 'long_name',
    field: {
      'id': 'country',
      'label': 'country',
      'type': 'text',
      'size': 'half'
    },
  },
  postal_code: {
    key: 'short_name',
    field: {
      'id': 'postal_code',
      'label': 'postal_code',
      'type': 'text',
      'size': 'half'
    },
  }
}

const ControlledInput = withLabel(StyledInput)

export default function AddressComponents({place = {address_components: []}, ...props}) {
  const fields = propsToForm.map(f => ({ ...f.field, value: props[f.propID] }))
  // const fields = []
  for (let i = 0; i < place.address_components.length; i++) {
    const placeDetail = place.address_components[i]
    const addressType = placeDetail.types[0]
    if (placeToForm[addressType]) {
      fields.push({
        ...placeToForm[addressType].field,
        controlled: true,
        value: placeDetail[placeToForm[addressType].key]
      })
    }
  }

  return <FieldGroup id={props.id} fields={fields}/>
  // return fields.map((f, i) => <ControlledInput key={i} onChange={onChange} {...f}/>)
}
