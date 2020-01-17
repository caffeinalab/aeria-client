import React, {PureComponent, createRef} from 'react'
import {withLabel, StyledInput} from '@aeria/uikit'
@withLabel
class AutoComplete extends PureComponent {
  constructor(props) {
    super(props)

    this.ref = createRef()
  }
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.ref.current, {types: ['geocode']})

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component', 'formatted_address', 'geometry'])

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener('place_changed', this.onPlaceSelected)
  }

  onPlaceSelected = () => {
    const place = this.autocomplete.getPlace()
    this.props.onPlaceChange({
      place,
      autocomplete: this.ref.current.value,
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    })
  }

  render() {
    const {id, value} = this.props
    return (
      <StyledInput
        id={id}
        ref={this.ref}
        type={'text'}
      />
    )
  }
}

export default AutoComplete
