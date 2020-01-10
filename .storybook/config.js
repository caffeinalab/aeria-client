import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { ThemeProvider } from 'styled-components'

import {GlobalStyles} from '../packages/aeria-uikit'

addDecorator(s => (
  <ThemeProvider theme={{
    breakpoints: {
      lg: 1200
    },
    palette: {
      primary: 'DodgerBlue',
      primaryBg: 'DodgerBlue',
      primaryLight: 'deepskyblue',
      primaryDark: 'navy',

      secondary: 'palevioletred',
      secondaryLight: 'palevioletred',
      secondaryLighter: 'palevioletred',

      errorMain: '#B31F19',
      errorBg: '#FFEBEB',

      backgroundLight: '#EEF6F9',
      borderLight: '#C6E1ED',

      greyLight: '#E0E0E0',
      grey: '#CFCFCF',

      white: '#FFFFFF',
      black: '#404040'
    }
  }}>
    <>
      <GlobalStyles />
      {s()}
    </>
  </ThemeProvider>
))

addDecorator(withKnobs)

configure(require.context('../packages', true, /\.stories\.(js|mdx)$/), module)

