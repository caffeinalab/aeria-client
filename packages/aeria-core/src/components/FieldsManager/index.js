import React from 'react'

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
    this.components[key] = component
    this.callbacks.forEach(cb => cb(this.components))
  }
}

const instance = new FieldsManager()

window.aeriaRegisterField = function(key, component) {
  instance.add(key, component)
}

export default instance
