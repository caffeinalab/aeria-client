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
     * Specifies a unique id for the `<select>` element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the `<select>` element.
     */
    label: PropTypes.string.isRequired,

    /**
     * Specifies the value of the `<select>` element.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
    ]),

    /**
     * Specifies that the `<select>` field must be filled out before submitting the form.
     */
    required: PropTypes.bool,

    /**
     * Specifies a short hint that describes the expected value of the `<input>` field.
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
     * Specifies that the user is allowed to enter more than one value in the `<select>` element.
     */
    multiple: PropTypes.bool,

    /**
     * Delimiter used to join multiple values into a single HTML Input value
     */
    delimiter: PropTypes.string,

    /**
     * Specifies that the `<select>` field is disabled.
     */
    isDisabled: PropTypes.bool,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string,

    /**
     * Defines the maximum children size.
     */
    max: PropTypes.number,

    /**
     * Defines the maximum children size.
     */
    maxError: PropTypes.string
  }

  static defaultProps = {
    className: 'AeriaSelect__container',
    classNamePrefix: 'AeriaSelect',
    max: Infinity,
    multiple: false,
    dependsOnField: false,
    delimiter: ',',
    loadingMessage: 'Looking for results...',
    noOptionsMessage: 'No result found',
    maxErrorMessage: 'You have reached the maximum size',
  }

  constructor(props) {
    super(props)

    this.loadOptions = throttle(this.loadOptions, THROTTLE_TIME)
    this.state = {
      value: this.props.value || this.props.defaultValue || (this.props.multiple ? [] : ''),
      options: this.props.options || []
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    return {
      shouldUpdateOptions: JSON.stringify(prevProps.dependsOnField) !== JSON.stringify(this.props.dependsOnField)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot.shouldUpdateOptions) {
      if (this.props.ajax) {
        this.loadOptions('', () => {
          this.setState({value: this.props.multiple ? [] : ''})
        })
      }
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

    this.lastFetch = fetchData(endpoint, {params})
      .then(data => {
        data.forEach(option => {
          option.value = String(option.value)
        })

        callback && callback(data)

        this.onDataChange({ options: data })
      })
  }

  loadingMessage = () => {
    return this.props.loadingMessage
  }

  noOptionsMessage = () => {
    const { multiple, max } = this.props
    const value = this.getSelectedValues()
    const maxReached = multiple && value.length >= max

    return maxReached ? this.props.maxErrorMessage : this.props.noOptionsMessage
  }

  getSelectedValues() {
    return this.props.multiple ? this.getMultipleValue() : this.getSingleValue()
  }

  getSingleValue() {
    return this.state.options.find(({ value }) => (
      `${value}` === `${this.state.value }`
    ))
  }

  getMultipleValue() {
    const {value} = this.state
    const values = Array.isArray(value) ? value : value.split(',')
    const stringValues = values.map(v => `${v}`)

    return this.state.options.filter(option => (
      stringValues.includes(`${option.value}`)
    ))
  }

  onChange = value => {
    if (!value) {
      this.onDataChange({ value: this.props.multiple ? [] : '' })
    } else {
      this.props.multiple ? this.onChangeMultiple(value) : this.onDataChange({value: value.value})
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

  triggerBlur = () => {
    this.props.onBlur && this.props.onBlur({target: {value: this.state.value}}, this.props)
  }

  render() {
    const { id, multiple, dependsOn, max, ...props } = this.props
    const { options } = this.state
    const value = this.getSelectedValues()
    const maxReached = multiple && value.length >= max

    return (
      <div
        id={`${id}-focus`}
        tabIndex={1}
        onBlur={this.triggerBlur}>
        {
          this.props.ajax
            ? <StyledAsync
              {...props}
              defaultOptions={options}
              cache={!dependsOn}
              name={id}
              isMulti={multiple}
              value={value || ''}
              loadingMessage={this.loadingMessage}
              noOptionsMessage={this.noOptionsMessage}
              onChange={this.onChange}
              onBlur={this.triggerChange}
              loadOptions={maxReached ? () => [] : this.loadOptions}
            />
            : <StyledSelect
              {...props}
              options={maxReached ? [] : options}

              name={id}
              isMulti={multiple}
              value={value}
              noOptionsMessage={this.noOptionsMessage}
              onChange={this.onChange}
              onBlur={this.triggerChange}
            />
        }
      </div>
    )
  }
}


export default Select
