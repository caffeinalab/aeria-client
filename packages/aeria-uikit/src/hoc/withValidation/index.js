import React, {PureComponent, Fragment} from 'react'

import Note from '../../components/Note'

import Validator from '../../utils/validator'

export default function withValidation(WrappedComponent) {
  return class extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        error: false
      }
    }

    checkErrors = ({value}) => {
      if (!this.validatorHelper) {
        this.validatorHelper = new Validator(this.props)
      }
      this.validatorHelper.validate((value))
        .then(error => {
          this.setState({ error }, () => {
            this.props.onChange && this.props.onChange({ error }, this.props)
          })
        })
    }

    onBlur = ({target}) => {
      this.checkErrors(target)
    }

    render() {
      return (
        <Fragment>
          <WrappedComponent
            {...this.props}
            validation={this.state.error}
            onBlur={this.onBlur}
            checkErrors={this.checkErrors}
          />
          {
            this.state.error && (
              <Note
                error
                position="left"
              >
                {this.state.error}
              </Note>
            )
          }
          {
            this.props.required && (
              <Note position="right"> *Required </Note>
            )
          }
        </Fragment>
      )
    }
  }
}