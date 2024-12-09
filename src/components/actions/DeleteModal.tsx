import {
    Modal,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

type DeleteModalProps = {
    closeModal: () => void
    deleteFn: () => void
    children: React.ReactElement
}

const DeleteModal = ({ children, deleteFn, closeModal }: DeleteModalProps) => {
    return (
        <Modal position="middle">
            <ModalContent>{children}</ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={closeModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button destructive onClick={() => deleteFn()}>
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

export default DeleteModal
