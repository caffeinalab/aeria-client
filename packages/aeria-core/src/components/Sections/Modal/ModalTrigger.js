import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '@aeria/uikit'

import StyledContainerButton from './StyledContainerButton'

const ModalTrigger = ({label, onClick}) => (
  <StyledContainerButton>
    <Button
      withIcon="add"
      onClick={onClick}>
      {label}
    </Button>
  </StyledContainerButton>
)

ModalTrigger.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
}

export default ModalTrigger
