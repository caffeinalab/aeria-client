import React from 'react'
import ReactDOM from 'react-dom'
import { Module, FieldsManager } from '@aeria/core'
import Metabox from '../Metabox'
import config from './config'

FieldsManager.use(config.uikit)

config.metaboxes.forEach((metaboxProps, key) => {
  ReactDOM.render((
    <Module {...config.module}>
      <Metabox
        key={key}
        index={key}
        {...metaboxProps}
      />
    </Module>
  ), document.getElementById('aeriaApp-' + metaboxProps.id))

  // ReactDOM.render((
  //   <Module>
  //     <GlobalStyles />
  //   </Module>
  // ), document.body.appendChild(document.createElement('div')))
})

document.addEventListener('DOMContentLoaded', _ => {
  const event = new CustomEvent('aeriaInit')
  window.dispatchEvent(event)
})

