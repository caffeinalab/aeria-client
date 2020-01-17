import React from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'

export default function Map({position, onMarkerDragEnd}) {
  return <GoogleMap
    zoom={18}
    center={position}>
    <Marker
      position={position}
      draggable
      onDragEnd={onMarkerDragEnd}
    />
  </GoogleMap>
}
