import React, { Component } from 'react'
import Collapse from '@kunukn/react-collapse'

import FieldGroup from '../../FieldGroup'
import SectionHeader from '../SectionHeader'

import StyledSection from './StyledSection'
import StyledContainer from './StyledContainer'

export default class Section extends Component {
  static defaultProps = {
    title: '',
    fields: [],
    isDraft: false,
    accordionState: true
  }

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      fields: this.props.fields,
      isDraft: this.props.isDraft,
      accordionState: this.props.accordionState,
    }
  }

  onChangeTitle = ({target}) =>{
    this.setState({ title: target.value }, this.triggerChange)
  }

  onChangeFields = ({fields}) => {
    this.setState({ fields: fields }, this.triggerChange)
  }

  onToggleDraftButton = () => {
    this.setState({ isDraft: !this.state.isDraft, accordionState: !!this.state.isDraft }, this.triggerChange)
  }

  onAccordionButton = () =>{
    this.setState({ accordionState: !this.state.accordionState }, this.triggerChange)
  }

  onDeleteButton = () => {
    this.props.onDeleteButton(this.props.index)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(this.state, this.props)
  }

  render() {
    const { accordionState, isDraft, fields } = this.state

    return (
      <StyledSection>
        <SectionHeader
          {...this.props}
          accordionState={accordionState}
          isDraft={isDraft}
          onToggleDraftButton={this.onToggleDraftButton}
          onChangeTitle={this.onChangeTitle}
          onAccordionButton={this.onAccordionButton}
          onDeleteButton={this.onDeleteButton}
        />
        <Collapse overflowOnExpanded isOpen={accordionState} transition="height 300ms cubic-bezier(.4, 0, .2, 1)">
          <StyledContainer>
            <FieldGroup
              fields={fields}
              id={this.props.id}
              index={this.props.index}
              onChange={this.onChangeFields}
            />
          </StyledContainer>
        </Collapse>
      </StyledSection>
    )
  }
}
