import React, {PureComponent, createRef} from 'react'
import {withLabel, StyledInput} from '@aeria/uikit'

const addressComponents = {
  administrative_area_level_1: {key: 'short_name', alias: 'region'},
  country: {key: 'long_name'},
  locality: {key: 'long_name'},
  postal_code: {key: 'short_name', alias: 'postalCode'},
  route: {key: 'long_name'},
  street_number: {key: 'short_name', alias: 'streetNumber'},
}
@withLabel
class AutoComplete extends PureComponent {
  constructor(props) {
    super(props)

    this.ref = createRef()
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.ref.current, {types: ['geocode']})
    this.autocomplete.setFields(['address_component', 'formatted_address', 'geometry'])
    this.autocomplete.addListener('place_changed', this.onPlaceSelected)
  }

  onPlaceSelected = () => {
    const place = this.autocomplete.getPlace()
    const placeComponents = {}

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0]
      if (addressComponents[addressType]) {
        placeComponents[addressComponents[addressType].alias || addressType] = place.address_components[i][addressComponents[addressType].key]
      }
    }

    this.props.onPlaceChange({
      ...placeComponents,
      address: this.ref.current.value,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    })
  }

  render() {
    const { id, value } = this.props
    return (
      <StyledInput
        id={id}
        name={id}
        defaultValue={value}
        ref={this.ref}
        type={'text'}
      />
    )
  }
}

export default AutoComplete
