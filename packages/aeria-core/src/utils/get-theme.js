import {darken, transparentize} from 'polished'

export default (colors) => {
  return {
    breakpoints: {
      lg: 1200
    },
    palette: {
      primary: colors[2],
      primaryBg: colors[2],
      primaryLight: transparentize(0.9, colors[2]),
      primaryDark: darken(0.1, colors[2]),

      secondary: colors[0],
      secondaryLight: transparentize(0.9, colors[1]),
      secondaryLighter: darken(0.1, colors[1]),

      errorMain: '#B31F19',
      errorBg: '#FFEBEB',

      backgroundLight: '#EEF6F9',
      borderLight: '#C6E1ED',

      greyLight: '#E0E0E0',
      grey: '#CFCFCF',

      white: '#FFFFFF',
      black: '#404040'
    }
  }
}
