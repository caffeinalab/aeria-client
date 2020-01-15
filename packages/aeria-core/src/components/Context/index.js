import React, { createContext, PureComponent } from 'react'
import { ThemeProvider } from 'styled-components'

const Context = createContext()

class Provider extends PureComponent {
  render() {
    const { config, theme, children } = this.props
    return (
      <Context.Provider value={{...config}}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </Context.Provider>
    )
  }
}

export default Context
export { Provider }
