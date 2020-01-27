import React, { Component } from 'react'
import Collapse from '@kunukn/react-collapse'

import Label from '../../components/Label'
import StyledHeader from './StyledHeader'
import StyledContent from './StyledContent'
import StyledSeparator from './StyledSeparator'
import StyledAccordionButton from './StyledAccordionButton'

export default function withAccordion(WrappedField) {
  return class extends Component {
    constructor(props) {
      super(props)

      this.state = {
        accordionState: props.accordionState !== undefined ? props.accordionState : true
      }
    }

    onAccordionButton = () =>{
      this.setState({
        accordionState: !this.state.accordionState
      }, () => {
        this.props.onChange && this.props.onChange({
          accordionState: this.state.accordionState
        }, this.props)
      })
    }

    render() {
      return (
        <div style={{padding: '0.625rem'}}>
          <input
            type="hidden"
            name={`${this.props.id}-accordion-state`}
            value={this.state.accordionState}
            readOnly
          />
          <StyledHeader>
            <Label {...this.props} />
            <StyledSeparator />
            <StyledAccordionButton
              onClick={this.onAccordionButton}
              accordionState={this.state.accordionState}
            />
          </StyledHeader>
          <Collapse overflowOnExpanded isOpen={this.state.accordionState} transition="height 300ms cubic-bezier(.4, 0, .2, 1)">
            <StyledContent>
              <WrappedField {...this.props} />
            </StyledContent>
          </Collapse>
        </div>
      )
    }
  }
}
