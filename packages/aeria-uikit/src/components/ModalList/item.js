import React from 'react'
import klona from 'klona'

import StyledItem from './StyledItem'
import StyledItemTitle from './StyledItemTitle'
import StyledItemDescription from './StyledItemDescription'

const Item = (props) => {
  const {config, onClick} = props
  const {id, label, description} = config

  const HandlerClick = () => {
    onClick && onClick(klona(config))
  }
  return (
    <StyledItem onClick={HandlerClick}>
      <StyledItemTitle>{label || id}</StyledItemTitle>
      {
        description &&
          <StyledItemDescription>{description}</StyledItemDescription>
      }
    </StyledItem>
  )
}

export default Item
