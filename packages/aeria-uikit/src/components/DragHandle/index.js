import React from 'react'
import { SortableHandle } from 'react-sortable-hoc'

import StyledDragHandle from './StyledDragHandle'

export default SortableHandle(() => (
  <StyledDragHandle>
    <span />
    <span />
    <span />
  </StyledDragHandle>))
