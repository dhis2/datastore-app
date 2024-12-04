import {
    Modal,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'

const DeleteModal = ({ children, deleteFn, closeModal }) => {
    return (
        <Modal position="middle">
            <ModalContent>{children}</ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button destructive onClick={() => deleteFn()}>
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DeleteModal.propTypes = {
    children: PropTypes.node,
    closeModal: PropTypes.func,
    deleteFn: PropTypes.func,
}

export default DeleteModal
