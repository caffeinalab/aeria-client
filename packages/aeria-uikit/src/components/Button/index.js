import React, { memo, Children } from 'react'
import PropTypes from 'prop-types'

import Icon from '~/components/Icons'
import StyledButton from './StyledButton'

const Button = (props) => (
  <StyledButton
    {...props}
    type="button"
  >
    {
      props.withIcon && (
        <Icon
          color="white"
          icon={props.withIcon}
        />
      )
    }
    &nbsp;
    {
      Children.toArray(props.children)
    }
  </StyledButton>
)

Button.defaultProps = {
  nopadding: false,
  disabled: false
}

Button.propTypes = {
  /**
   * The label to display into `Button` component.
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,

  /**
   * If true will remove padding around the `Button` component.
   */
  nopadding: PropTypes.bool,

  /**
   * Name of the icon that we want to display.
   */
  withIcon: PropTypes.string,

  /**
   * If true disable the interaction with the `Button` component.
   */
  disabled: PropTypes.bool
}

export { Button }
export default memo(Button)
