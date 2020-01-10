import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import IconSet from './icon-set'

class Icon extends PureComponent {
  render() {
    const name = this.props.icon && (this.props.icon.charAt(0).toUpperCase() + this.props.icon.slice(1))
    const SelectedIcon = IconSet[name]
    return SelectedIcon ? <SelectedIcon {...this.props} /> : null
  }
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string
}

Icon.defaultProps = {
  color: 'primary'
}


export default Icon
