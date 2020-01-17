import React, {Suspense} from 'react'

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

const AsyncComponent = async({Component, apiKey, ...props}) => {
  if (!apiKey) {
    return <p>Google Maps Api key is not found. Check it in Aeria Settings.</p>
  }
  await loadGMapsApi(apiKey)
  return (
    <Component {...props} />
  )
}

export default function withGMapsApi(WrappedComponent) {
  return (props) => (
    <Suspense fallback={<p>Loading..</p>}>
      <AsyncComponent Component={WrappedComponent} {...props} />
    </Suspense>
  )
}
