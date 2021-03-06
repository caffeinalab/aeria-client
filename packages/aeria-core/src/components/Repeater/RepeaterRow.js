import React from 'react'
import {Icons, DragHandle} from '@aeria/uikit'
import FieldGroup from '../FieldGroup'

import StyledRow from './StyledRow'
import StyledContainerInput from './StyledContainerInput'
import StyledContainerCta from './StyledContainerCta'
import StyledCta from './StyledCta'

const RepeaterRow = (props) => (
  <StyledRow>
    <DragHandle />
    <StyledContainerInput>
      <FieldGroup
        id={props.id}
        index={props.index}
        fields={props.fields}
        onChange={props.onChange}
      />
    </StyledContainerInput>
    <StyledContainerCta>
      <StyledCta onClick={()=>{props.onDeleteButton(props.index)}} >
        <Icons icon="close" />
      </StyledCta>
    </StyledContainerCta>
  </StyledRow>
)
export default RepeaterRow
