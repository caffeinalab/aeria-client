import React, {PureComponent, Fragment} from 'react'

import Note from '~/components/Note'

import Validator from '~/utils/validator'

export default function withValidation(WrappedComponent) {
  return class extends PureComponent {
    checkErrors = _ => {
      if (!this.validatorHelper) {
        this.validatorHelper = new Validator(this.props.options)
      }
      this.validatorHelper.validate((this.props.options.value || this.props.options.defaultValue))
        .then(error => {
          this.props.onChange({ error }, this.props.index)
        })
    }

    handleBlur = _ => {
      this.checkErrors()
    }

    render() {
      return (
        <Fragment>
          <WrappedComponent
            {...this.props}
            validation={this.props.error}
            handleBlur={this.handleBlur}
            checkErrors={this.checkErrors}
          />
          {
            this.props.error && (
              <Note
                error
                position="left"
              >
                {this.props.error}
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
