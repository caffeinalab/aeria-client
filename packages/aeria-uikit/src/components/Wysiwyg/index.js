import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import StyledWysiwyg from './StyledWysiwyg'

import withLabel from '../../hoc/withLabel'
import withValidation from '../../hoc/withValidation'

@withLabel
@withValidation
class Wysiwyg extends PureComponent {
  static propTypes = {
    /**
     * The editor toolbar configuration.
     */
    toolbar: PropTypes.array.isRequired,

    /**
     * The field wrapper element id.
     */
    id: PropTypes.string,

    /**
     * Callback function invoked when the value of the wysiwyg has been changed.
     */
    onChange: PropTypes.func,

    /**
     * Specifies the value of the wysiwyg field.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * Specifies the initial value of the wysiwyg field.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),

    /**
     * Specifies that the wysiwyg field must be filled out before submitting the form.
     */
    required: PropTypes.bool,

    /**
     * A string with the error if occurs.
     */
    error: PropTypes.string
  }

  // TO-DO: complete defaultProps list
  static defaultProps = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ]
  }

  constructor(props) {
    super(props)
    this.state = { value: props.value || props.defaultValue || '' }
    this.quillRef = createRef()
  }

  componentDidMount() {
    this.quill = new Quill(this.quillRef.current, {
      theme: 'snow',
      modules: {
        toolbar: this.props.toolbar
      }
    })

    this.quill.on('editor-change', this.onChange)
    this.quill.root.innerHTML = this.state.value || ''
  }

  componentWillUnmount() {
    this.quill.off('editor-change', this.onChange)
  }

  isQuillEmpty() {
    if ((this.quill.getContents().ops || []).length !== 1) { return false }
    return this.quill.getText().trim().length === 0
  }

  onChange = () => {
    this.setState({ value: this.isQuillEmpty() ? '' : this.quill.root.innerHTML }, () => {
      this.props.onChange && this.props.onChange({value: this.state.value}, this.props)
    })
  }

  onBlur = () =>{
    this.props.onBlur && this.props.onBlur({target: {value: this.state.value}}, this.props)
  }

  render() {
    const { id, validation } = this.props

    return (
      <StyledWysiwyg
        validation={validation}
        id={`${id}-focus`}
        tabIndex={0}
        onBlur={this.onBlur}
      >
        <div ref={this.quillRef} />
        <input id={id} name={id} type="hidden" value={this.state.value} />
      </StyledWysiwyg>
    )
  }
}

export default Wysiwyg
