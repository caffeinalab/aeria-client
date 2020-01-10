import React, { useState, useEffect } from 'react'
import { Provider, FieldsManager } from '@aeria/core'

const Module = ({ sectionTypes = [], theme, children }) => {
  const components = FieldsManager.getAll()
  const [state, setState] = useState({ sectionTypes, components })
  const handleComponentsUpdate = components => {
    setState(prevState => ({ ...prevState, components }))
  }

  useEffect(() => {
    FieldsManager.addListener(handleComponentsUpdate)
  }, [])

  return <Provider config={state} theme={theme}>{children}</Provider>
}

export default Module