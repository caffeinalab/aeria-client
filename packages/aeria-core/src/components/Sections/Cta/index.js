import React, { PureComponent, Fragment } from 'react'
import {Modal} from '@aeria/uikit'

import Context from '../../Context'
import {ModalContent, ModalTrigger} from '../Modal'

class Cta extends PureComponent {
  static contextType = Context

  render() {
    const {sectionTypes = {}} = this.context
    const {ctaLabel =  'Add section',  accepts = [], onClick} = this.props
    return <Fragment>
      {
        accepts.length === 1
          ? (
            <ModalTrigger
              label={ctaLabel}
              onClick={() => onClick(sectionTypes[accepts[0]])}
            />
          )
          : (
            <Modal
              role="modal"
              ariaLabel="Add section modal"
              triggerComponent={ModalTrigger}
              triggerLabel={ctaLabel}
            >
              <ModalContent
                acceptedTypes={accepts}
                onClickChild={onClick}
              />
            </Modal>
          )
      }
    </Fragment>
  }
}

export default Cta
