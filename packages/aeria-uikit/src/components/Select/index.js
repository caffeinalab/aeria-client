import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import { StyledSelect, StyledAsync } from './StyledSelect'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

import fetchData from '../../utils/fetch-data'

/*
  needle // ricerca
  orderby // colonna di ordinamento
  ascdesc // ordinamento
  post_type // singolo post type; solo in search_posts_head
  post_types // lista di post_type, nella forma di singola con ogni type diviso da virgola; solo in search_posts_head
  taxonomy // tassonomia
  term // singolo tag
  terms // lista di tag, con ogni tag diviso da virgola
*/

const THROTTLE_TIME = 1000

@withLabel
@withValidation
class Select extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the <input> element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the <input> element.
     */
    label: PropTypes.string.isRequired,

    /**
     * Specifies the value of the <select> element.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * Specifies that the <select> field must be filled out before submitting the form.
     */
    required: PropTypes.bool,

    /**
     * Specifies a short hint that describes the expected value of the <input> field.
     */
    placeholder: PropTypes.string,

    /**
     * Specifies a loading message
     */
    loadingMessage: PropTypes.string,

    /**
     * Specifies a no options available message
     */
    noOptionsMessage: PropTypes.string,

    /**
     * Specifies that the user is allowed to enter more than one value in the <select> element.
     */
    multiple: PropTypes.bool,

    /**
     * Delimiter used to join multiple values into a single HTML Input value
     */
    delimiter: PropTypes.string,

    /**
     * Specifies that the <select> field is disabled.
     */
    isDisabled: PropTypes.bool,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,
  }

  static defaultProps = {
    className: 'AeriaSelect__container',
    classNamePrefix: 'AeriaSelect',
    multiple: false,
    dependsOnField: false,
    defaultValue: '',
    delimiter: ',',
    loadingMessage: 'Looking for results...',
    noOptionsMessage: 'No result found',
  }

  constructor(props) {
    super(props)

    this.loadOptions = throttle(this.loadOptions, THROTTLE_TIME)
    this.state = {
      value: this.props.value || this.props.defaultValue
    }
  }

  loadOptions = (s, callback) => {
    if (this.lastFetch && this.lastFetch.cancel) {
      this.lastFetch.cancel()
    }

    const {ajax, dependsOn, dependsOnField = false} = this.props
    const { endpoint = '/wp-json/aeria/search' } = ajax
    const params = { ...ajax, sender: 'SelectOptions', s }

    if (dependsOn && dependsOnField) {
      params[dependsOn.key] = dependsOnField.value || dependsOnField.defaultValue
    }

    this.lastFetch = fetchData(endpoint, params)
      .then(data => {
        data.forEach(option => {
          option.value = String(option.value)
        })

        callback && callback(data)
        this.props.onChange({ options: data })
      })
  }

  getSelectedValues() {
    return this.props.multiple ? this.getMultipleValue() : this.getSingleValue()
  }

  getSingleValue() {
    return this.props.options.find(({ value }) => (
      `${value}` === `${this.state.value || this.state.defaultValue}`
    ))
  }

  getMultipleValue() {
    const {value} = this.state
    const values = Array.isArray(value) ? value : value.split(',')
    const stringValues = values.map(v => `${v}`)

    return this.props.options.filter(({ v }) => (
      stringValues.includes(`${v}`)
    ))
  }

  onChange = value => {
    if (!value) {
      this.props.onChange({ value: this.props.multiple ? [] : '' })
    } else {
      this.props.multiple ? this.onChangeMultiple(value) : this.onDataChange(value)
    }
  }

  onChangeMultiple = values => {
    const value = values.map(item => item.value)
    this.onDataChange({ value: value.join(',') })
  }

  onDataChange(data) {
    this.setState({ ...data }, this.triggerChange)
  }

  triggerChange = () => {
    this.props.onChange && this.props.onChange(this.state, this.props)
  }

  render() {
    const { id, multiple, ...props } = this.props
    const value = this.getSelectedValues()

    if (this.props.ajax) {
      return (
        <StyledAsync
          {...props}
          defaultOptions
          name={id}
          isMulti={multiple}
          defaultValue={value}
          onChange={this.onChange}
          loadOptions={this.loadOptions}
        />
      )
    }
    return (
      <StyledSelect
        {...props}
        name={id}
        isMulti={multiple}
        defaultValue={value}
        onChange={this.onChange}
      />
    )
  }
}


export default Select
