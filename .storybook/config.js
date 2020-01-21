import React, {Fragment} from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import {GlobalStyles} from '../packages/aeria-uikit'
import {getTheme, Provider, FieldsManager} from '../packages/aeria-core'
import config from './input-config'

FieldsManager.use(config.uikit)

addDecorator(s => (
  <Provider 
      theme={
        getTheme([
          "#413256",
          "#523f6d",
          "#a3b745",
          "#d46f15"
        ])
      }
      config={{sectionTypes:{
        "counters": {
          "id": "counters",
          "label": "Counters",
          "fields": [
            {
              "id": "icon",
              "type": "picture",
              "label": "Icona",
              "size": "half",
              "description": "Inserisci icona"
            },
            {
              "type": "date",
              "id": "startTime",
              "size": "half",
              "label": "Data di inizio del contatore"
            },
            {
              "id": "count",
              "type": "number",
              "size": "half",
              "label": "Numero di inizio contatore"
            },
            {
              "id": "increment",
              "type": "number",
              "size": "half",
              "label": "Incremento per secondo"
            },
            {
              "id": "description",
              "type": "wysiwyg",
              "label": "Descrizione",
              "description": "Inserisci descrizione"
            },
            {
              "id": "highlight",
              "type": "text",
              "label": "Testo di similitudine"
            },
            {
              "id": "texture_highlight",
              "type": "picture",
              "size": "half",
              "label": "Background testo di similitudine"
            }
          ]
        },
        "image": {
          "id": "image",
          "label": "Immagine",
          "fields": [
            {
              "id": "label",
              "type": "text",
              "label": "Didascalia",
              "size": "full"
            },
            {
              "id": "image",
              "type": "picture",
              "label": "Immagine",
              "size": "full"
            }
          ]
        },
        "list": {
          "id": "list",
          "label": "Lista",
          "titleAs": "label",
          "fields": [
            {
              "id": "label",
              "type": "text",
              "label": "Didascalia",
              "size": "full"
            },
          ]
        },
        "text": {
          "id": "text",
          "label": "Testo",
          "fields": [
            {
              "id": "text",
              "type": "wysiwyg",
              "label": "Blocco testo",
              "size": "full"
            }
          ]
        },
        "title-big": {
          "id": "title-big",
          "label": "Titolo grande",
          "fields": [
            {
              "id": "icon",
              "type": "picture",
              "label": "Icona",
              "size": "full"
            },
            {
              "id": "title",
              "type": "text",
              "label": "Blocco testo",
              "size": "full"
            }
          ]
        },
        "title-small": {
          "id": "title-small",
          "label": "Titolo piccolo",
          "fields": [
            {
              "id": "icon",
              "type": "picture",
              "label": "Icona",
              "size": "full"
            },
            {
              "id": "title",
              "type": "text",
              "label": "Blocco testo",
              "size": "full"
            }
          ]
        }
      }}}
    >
    <Fragment>
      <GlobalStyles />
      {s()}
    </Fragment>
  </Provider>
))

addDecorator(withKnobs)

configure(require.context('../packages', true, /\.stories\.(js|mdx)$/), module)

