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
        isOpen: props.isOpen !== undefined ? props.isOpen : true
      }
    }

    onAccordionButton = () =>{
      this.setState({
        isOpen: !this.state.isOpen
      }, () => {
        this.props.onChange && this.props.onChange({
          isOpen: this.state.isOpen
        }, this.props)
      })
    }

    render() {
      return (
        <div style={{padding: '0.625rem'}}>
          <StyledHeader>
            <Label {...this.props} />
            <StyledSeparator />
            <StyledAccordionButton
              onClick={this.onAccordionButton}
              accordionState={this.state.isOpen}
            />
          </StyledHeader>
          <Collapse isOpen={this.state.isOpen} transition="height 300ms cubic-bezier(.4, 0, .2, 1)">
            <StyledContent>
              <WrappedField {...this.props} />
            </StyledContent>
          </Collapse>
        </div>
      )
    }
  }
}
