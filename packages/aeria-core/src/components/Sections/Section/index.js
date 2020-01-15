import React, { Component } from 'react'
import Collapse from '@kunukn/react-collapse'

import FieldGroup from '../../FieldGroup'
import SectionHeader from '../SectionHeader'

import StyledSection from './StyledSection'
import StyledContainer from './StyledContainer'

export default class Section extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDraft: this.props.isDraft || false,
      accordionState: this.props.accordionState || true
    }
  }

  onChangeTitle = ({target}) =>{
    this.setState({title: target.value }, () => {
      this.props.onChange && this.props.onChange({
        title: this.state.title
      }, this.props.index)
    })
  }

  onToggleDraftButton = () => {
    this.setState({isDraft: !this.state.isDraft }, () => {
      this.props.onChange && this.props.onChange({
        isDraft: this.state.isDraft
      }, this.props.index)
    })
  }

  onAccordionButton = () =>{
    this.setState({accordionState: !this.state.accordionState }, () => {
      this.props.onChange && this.props.onChange({
        accordionState: this.state.accordionState
      }, this.props.index)
    })
  }

  onDeleteButton = () => {
    this.props.onDeleteButton(this.props.index)
  }

  render() {
    const { fields = [] } = this.props
    const {
      accordionState = this.defaultAccordionState,
      isDraft = this.defaultDraftState
    } = this.state

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
        <Collapse isOpen={accordionState} transition="height 300ms cubic-bezier(.4, 0, .2, 1)">
          <StyledContainer>
            <FieldGroup
              fields={fields}
              id={this.props.id}
              // onChange={this.onChangeChild}
            />
          </StyledContainer>
        </Collapse>
      </StyledSection>
    )
  }
}
