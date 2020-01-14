import React, { useState, useEffect } from 'react'
import { Provider } from '../Context'
import FieldsManager from '../FieldsManager'
import getTheme from '../../utils/get-theme'

const Module = ({ sectionTypes = [], theme, children }) => {
  const components = FieldsManager.getAll()
  const [state, setState] = useState({ sectionTypes, components })
  const handleComponentsUpdate = components => {
    setState(prevState => ({ ...prevState, components }))
  }

  useEffect(() => {
    FieldsManager.addListener(handleComponentsUpdate)
  }, [])
  return <Provider config={state} theme={getTheme(theme)}>{children}</Provider>
}

export default Module
