import React, {PureComponent, Fragment} from 'react'
import klona from 'klona'
import { withAccordion } from '@aeria/uikit'
import withGMapsApi from '../../hoc/withGMapsApi'

import Map from './Map'
import AutoComplete from './AutoComplete'
import AddressComponents from './AddressComponents'

@withAccordion
@withGMapsApi
class Maps extends PureComponent {
  constructor(props) {
    super(props)
    const {value = {}, defaultValue = {}} = props
    this.state = {
      position: {
        lat: value.lat || defaultValue.lat || 44.80148500000001,
        lng: value.lng || defaultValue.lng || 10.327903600000013,
      }
    }
  }

  onMarkerDragEnd = (event) => {
    this.setState({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    }, this.triggerChange)
  }

  onPlaceChange = (data) => {
    debugger
    this.setState({...data}, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(this.state, this.props)
  }

  render() {
    const { id, secondaryLabels = {}} = this.props
    const { position, place } = this.state

    return <Fragment>
      <Map
        position={position}
        onMarkerDragEnd={this.onMarkerDragEnd}
      />
      <AutoComplete
        label={secondaryLabels.autocomplete}
        id={`${id}-autocomplete`}
        onPlaceChange={this.onPlaceChange}
      />

      <AddressComponents
        lat={position.lat}
        lng={position.lng}
        // address={place.}
        place={place}
        label={secondaryLabels.addressComponents}
      />
    </Fragment>
  }
}

export default Maps
