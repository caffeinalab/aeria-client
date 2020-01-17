import React, {PureComponent} from 'react'
import Input from '@aeria/uikit'

class AutoComplete extends PureComponent {
  onInputRef = (ref) =>{
    this.ref = ref
    this.autocomplete = new google.maps.places.Autocomplete(ref, {types: ['geocode']})

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component', 'formatted_address', 'geometry'])

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener('place_changed', this.onPlaceSelected)
  }

  onPlaceSelected = () => {
    const place = this.autocomplete.getPlace()
    this.props.onChange({
      place,
      autocomplete: this.ref.value,
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    })
  }

  render() {
    return (
      <Input
        type={'text'}
        id={this.props.id}
        name={this.props.id}
        ref={this.onInputRef}
        defaultValue={this.props.defaultValue}
      />
    )
  }
}

export default AutoComplete
