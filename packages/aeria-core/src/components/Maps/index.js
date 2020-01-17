import React, {PureComponent, Fragment} from 'react'
import klona from 'klona'
import { withLabel } from '@aeria/uikit'
import withGMapsApi from '../../hoc/withGMapsApi'
import Map from './Map'
import AutoComplete from './AutoComplete'

@withLabel
@withGMapsApi
class Maps extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      position: {
        lat: props.lat,
        lng: props.lng
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
    this.setState({...data}, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(this.state, this.props)
  }

  render() {
    const { id } = this.props
    const { position } = this.state

    return <Fragment>
      <Map
        position={position}
        onMarkerDragEnd={this.onMarkerDragEnd}
      />
      <AutoComplete
        id={`${id}-autocomplete`}
        onPlaceChange={this.onPlaceChange}
      />

    </Fragment>
  }
}

export default Maps
