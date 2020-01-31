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

    getSnapshotBeforeUpdate(prevProps) {
      const errorFromProps = this.props.error !== prevProps.error && this.props.error !== this.state.error
      return errorFromProps ? {error: this.props.error } : null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (snapshot) {
        this.setState(snapshot)
      }
    }

    checkErrors = ({value}) => {
      if (!this.validatorHelper) {
        this.validatorHelper = new Validator(this.props)
      }
      this.validatorHelper.validate((value))
        .then(error => {
          this.setState({ error: error ? this.props.requiredError || error : error }, () => {
            this.props.onChange && this.props.onChange(this.state, this.props)
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
