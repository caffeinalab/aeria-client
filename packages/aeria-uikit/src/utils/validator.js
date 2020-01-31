import isEmpty from 'lodash.isempty'
import fetchData from './fetch-data'

export default class Validator {
  constructor(options) {
    this.isRequired = options.required || false
    this.validators = options.validators || false
    this.validationUrl = `/wp-json/aeria/validate?validators=${this.validators}`
  }

  cleanFetch = () => {
    if (this.lastFetch && this.lastFetch.cancel) {
      this.lastFetch.cancel()
    }
  }

  isEmpty = (value) => {
    const validation = {
      status: false,
    }

    if (!value
      || (typeof value === 'object' && isEmpty(value))
      || (typeof value !== 'object' && isEmpty(`${value}`))
      || (Array.isArray(value) && value.every(v => v == undefined))
    ) {
      validation.status = true
      validation.message = 'Il campo deve essere compilato'
    }

    return validation
  }


  remoteValidation = async(value) => {
    this.lastFetch = fetchData(`${this.validationUrl}&field=${value}`)

    return this.lastFetch.then(data => {
      this.lastFetch = undefined
      delete data.value
      return data
    }).catch(err => {
      return undefined
    })
  }

  validate = async(value) => {
    this.cleanFetch()
    let error
    if (this.isRequired) {
      error = this.isEmpty(value)
      if (error.status) {
        return error.message
      }
    }

    if (this.validators) {
      error = await this.remoteValidation(value)
      if (error.status) {
        return error.message.join(', ')
      }
    }
    return undefined
  }
}
