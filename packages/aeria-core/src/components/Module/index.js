import React, { useState, useEffect } from 'react'
import { Provider } from '../Context'
import FieldsManager from '../FieldsManager'
import getTheme from '../../utils/get-theme'
import StyledContainer from './StyledContainer'

const Module = ({ sectionTypes = [], theme, children }) => {
  const components = FieldsManager.getAll()
  const [state, setState] = useState({ sectionTypes, components })

  const handleComponentsUpdate = newComponents => {
    setState(prevState => ({ ...prevState, components: newComponents }))
  }

  useEffect(() => {
    FieldsManager.addListener(handleComponentsUpdate)
  }, [])

  return (
    <Provider config={state} theme={getTheme(theme)}>
      <StyledContainer>
        {children}
      </StyledContainer>
    </Provider>
  )
}

export default Module
