import React from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'

export default function Map({position, onMarkerDragEnd}) {
  return (
    <GoogleMap
      zoom={18}
      center={position}
      mapContainerStyle={{ height: '400px', margin: '0.625rem' }}
    >
      <Marker
        position={position}
        draggable
        onDragEnd={onMarkerDragEnd}
      />
    </GoogleMap>
  )
}
