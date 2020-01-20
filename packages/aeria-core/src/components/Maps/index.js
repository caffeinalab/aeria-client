import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withAccordion } from '@aeria/uikit'

import withGMapsApi from '../../hoc/withGMapsApi'
import Map from './Map'
import AutoComplete from './AutoComplete'
import AddressComponents from './AddressComponents'

@withAccordion
@withGMapsApi
class Maps extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the <input> element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the Map group component.
     */
    label: PropTypes.string,

    /**
     * Defines the labels for all subinputs.
     */
    secondaryLabels: {
      address: PropTypes.string,
      lat: PropTypes.string,
      lng: PropTypes.string,
      country: PropTypes.string,
      region: PropTypes.string,
      locality: PropTypes.string,
      route: PropTypes.string,
      streetNumber: PropTypes.string,
      postalCode: PropTypes.string
    },

    /**
     * Defines a description for the <input> element.
     */
    description: PropTypes.string,

    /**
     * Defines the value object
     */
    value: PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      address: PropTypes.string,
      country: PropTypes.string,
      region: PropTypes.string,
      locality: PropTypes.string,
      route: PropTypes.string,
      streetNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      postalCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),

    /**
     * Defines the default value object
     */
    defaultValue: PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      address: PropTypes.string,
      country: PropTypes.string,
      region: PropTypes.string,
      locality: PropTypes.string,
      route: PropTypes.string,
      streetNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      postalCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  }

  static defaultProps = {
    secondaryLabels: {
      address: 'Address',
      lat: 'Latitude',
      lng: 'Longitude',
      country: 'Country',
      region: 'Region',
      locality: 'Locality',
      route: 'Route',
      streetNumber: 'Street Number',
      postalCode: 'Postal Code',
    },
    value: {},
    defaultValue: {
      lat: 44.80148500000001,
      lng: 10.327903600000013,
      address: '',
      country: '',
      region: '',
      locality: '',
      route: '',
      streetNumber: '',
      postalCode: '',
    }
  }

  constructor(props) {
    super(props)

    const {value, defaultValue} = props
    this.state = {
      lat: value.lat || defaultValue.lat,
      lng: value.lng || defaultValue.lng,
      address: value.address || defaultValue.address,
      country: value.country || defaultValue.country,
      region: value.region || defaultValue.region,
      locality: value.locality || defaultValue.locality,
      route: value.route || defaultValue.route,
      streetNumber: value.streetNumber || defaultValue.streetNumber,
      postalCode: value.postalCode || defaultValue.postalCode,
    }
  }

  onMarkerDragEnd = (event) => {
    this.setState({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }, this.triggerChange)
  }

  onPlaceChange = (data) => {
    this.setState({...data}, this.triggerChange)
  }

  onAddressComponentChange = ({fields}) => {
    const data = fields.reduce((acc, {id, value, type}) => {
      acc[id] = type === 'number' ? Number(value) : value
      return acc
    }, {})

    this.setState({...data}, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange({value: this.state}, this.props)
  }

  render() {
    const { id, secondaryLabels} = this.props
    const { lat, lng } = this.state
    debugger
    return (
      <Fragment>
        <Map
          position={{lat, lng}}
          onMarkerDragEnd={this.onMarkerDragEnd}
        />
        <AutoComplete
          label={secondaryLabels.address}
          id={`${id}-address`}
          onPlaceChange={this.onPlaceChange}
        />
        <AddressComponents
          id={id}
          value={this.state}
          labels={secondaryLabels}
          onChange={this.onAddressComponentChange}
        />
      </Fragment>
    )
  }
}

export default Maps
