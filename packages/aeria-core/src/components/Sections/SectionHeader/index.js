import React from 'react'

import {Icons, DragHandle} from '@aeria/uikit'

import StyledCta from './StyledCta'
import StyledInfo from './StyledInfo'
import StyledInputTitle from './StyledInputTitle'
import StyledWrapper from './StyledWrapper'
import StyledWrapperInfo from './StyledWrapperInfo'
import StyledWrapperCta from './StyledWrapperCta'

const SectionHeader = props => {
  const {
    id,
    titleAs = false,
    labelAs = false,
    titleHidden = false,
    accordionState,
    isDraft,
    onChangeTitle,
    onToggleDraftButton,
    onAccordionButton,
    onDeleteButton
  } = props

  const getValueFromField = (inputId, defaultValue) => {
    let value = defaultValue
    props.fields.some(f => {
      if (f.id === inputId) {
        value = f.value || f.defaultValue || defaultValue
        return true
      }
      return false
    })
    return value
  }

  let title = props.title || ''
  let label = props.label || props.type

  if (titleAs) {
    title = getValueFromField(titleAs, title)
  }

  if (labelAs) {
    label = getValueFromField(labelAs, label)
  }

  return  (
    <StyledWrapper draft={isDraft}>
      <input
        type="hidden"
        name={`${id}-draft`}
        value={isDraft}
        readOnly
      />
      <input
        type="hidden"
        name={`${id}-accordion-state`}
        value={accordionState}
        readOnly
      />
      <DragHandle />
      <StyledWrapperInfo>
        {
          !titleHidden
          && <StyledInfo>
            <strong>Title</strong>
            <StyledInputTitle
              type="text"
              value={title}
              disabled={ !!titleAs }
              name={`${id}-headerTitle`}
              placeholder={ 'Add a title' }
              onChange={onChangeTitle}
            />
          </StyledInfo>
        }
        <StyledInfo>
          <strong>type</strong>
          <p>{ label }</p>
        </StyledInfo>
      </StyledWrapperInfo>

      <StyledWrapperCta>
        <StyledCta onClick={onToggleDraftButton} >
          <Icons icon={ isDraft ? 'hidden' : 'show'} />
        </StyledCta>
        <StyledCta onClick={onAccordionButton} >
          <Icons icon="edit" />
        </StyledCta>
        <StyledCta onClick={onDeleteButton} >
          <Icons icon="delete" />
        </StyledCta>
      </StyledWrapperCta>
    </StyledWrapper>
  )
}

export default SectionHeader
