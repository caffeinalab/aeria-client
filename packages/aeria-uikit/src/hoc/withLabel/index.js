import React, { Component } from 'react'

import Label from '../../components/Label'
import StyledHeader from './StyledHeader'
import StyledContent from './StyledContent'

export default function withLabel(WrappedField) {
  return class extends Component {
    render() {
      return (
        <div style={{padding: '0.625rem'}}>
          <StyledHeader>
            <Label {...this.props} />
          </StyledHeader>
          <StyledContent>
            <WrappedField {...this.props} />
          </StyledContent>
        </div>
      )
    }
  }
}
