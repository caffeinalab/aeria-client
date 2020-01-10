import PropTypes from 'prop-types'
import React, { memo, Fragment } from 'react'

import StyledLabel from './StyledLabel'
import StyledTooltip from './StyledTooltip'

const Label = (props) => {
  const {id, label, description} = props

  return <Fragment>
    {
      label && (
        <StyledLabel htmlFor={id}>
          {label}
          {
            description && (
              <StyledTooltip description={description}> ? </StyledTooltip>
            )
          }
        </StyledLabel>
      )
    }
  </Fragment>
}

Label.propTypes = {
  /**
     * Specifies a unique id for the <input> element.
     */
  id: PropTypes.string.isRequired,

  /**
     * Defines a label for the <input> element.
     */
  label: PropTypes.string,

  /**
     * Defines a description for the <input> element.
     */
  description: PropTypes.string,
}

export default memo(Label)
