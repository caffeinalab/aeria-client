import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { ThemeProvider } from 'styled-components'

import {GlobalStyles} from '../packages/aeria-uikit'
import {getTheme} from '../packages/aeria-core'

addDecorator(s => (
  <ThemeProvider theme={getTheme([
    "#413256",
    "#523f6d",
    "#a3b745",
    "#d46f15"
  ])}>
    <>
      <GlobalStyles />
      {s()}
    </>
  </ThemeProvider>
))

addDecorator(withKnobs)

configure(require.context('../packages', true, /\.stories\.(js|mdx)$/), module)

