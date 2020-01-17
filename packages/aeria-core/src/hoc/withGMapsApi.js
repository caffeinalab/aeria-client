import React, {useEffect, useState} from 'react'

let LoadPromise

function loadGMapsApi(apiKey) {
  if (!LoadPromise) {
    LoadPromise = new Promise((resolve, reject) => {
      try {
        const script = document.createElement('script')
        script.async = true
        script.defer = true
        script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`
        script.addEventListener('load', () => resolve())
        document.body.appendChild(script)
      } catch (err) {
        reject(err)
      }
    })
  }
  return LoadPromise
}

export default function withGMapsApi(WrappedComponent) {
  return ({apiKey, ...props}) => {
    if (!apiKey) {
      return <p>Google Maps Api key is not found. Check it in Aeria Settings.</p>
    }
    const [apiLoaded, setApiLoaded] = useState(false)
    useEffect(()=> {
      loadGMapsApi(apiKey).then(() => setApiLoaded(true))
    }, [])

    return apiLoaded ? <WrappedComponent {...props} /> : <p>Loading..</p>
  }
}
