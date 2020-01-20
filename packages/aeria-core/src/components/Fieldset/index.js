import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {withAccordion} from '@aeria/uikit'

import FieldGroup from '../FieldGroup'

@withAccordion
class Fieldset extends PureComponent {
  static propTypes = {
    /**
     * Specifies a unique id for the `<input>` element.
     */
    id: PropTypes.string.isRequired,

    /**
     * Defines a label for the `<input>` element.
     */
    label: PropTypes.string,

    /**
     * Defines a description for the `<input>` element.
     */
    description: PropTypes.string,

    /**
     * Defines the fields of this group.
     */
    fields: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <FieldGroup {...this.props}/>
    )
  }
}

export default Fieldset
