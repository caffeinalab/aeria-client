import React from 'react'
// import fieldValidable from '../components/FieldValidable'
// import isReactComponent from '../../utils/is-react-component'

const fallbackElement = _ => <div>Field type error</div>

class FieldsManager {
  constructor() {
    this.components = {}
    this.callbacks = []
  }

  addListener(callback) {
    this.callbacks.push(callback)
  }

  get(key) {
    return this.components[key] || fallbackElement
  }

  getAll() {
    return this.components
  }

  use(components = {}) {
    this.components = components
  }

  add = (key, component) => {
    if (this.components[key]) {
      console.log(`[Aeria] A component with key ${key} already exist`)
      return
    }
    if (!isReactComponent(component)) {
      console.log(`[Aeria] The component with key ${key} seems to not be a React Component`)
      return
    }
    this.components[key] = component
    this.callbacks.forEach(cb => cb(this.components))
  }
}

const instance = new FieldsManager()

// window.aeriaRegisterField = function(key, component) {
//   fieldManager.add(key, fieldValidable(component))
// }

export default instance
