import {
    Modal,
    ModalContent,
    ModalActions,
    ModalTitle,
    Button,
    ButtonStrip,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

type DeleteModalProps = {
    closeModal: () => void
    handleDelete: () => void
    children: React.ReactNode
    title: string
}

const DeleteModal = ({
    children,
    handleDelete,
    closeModal,
    title,
}: DeleteModalProps) => {
    return (
        <Modal position="middle">
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>{children}</ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={closeModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button destructive onClick={() => handleDelete()}>
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

export default DeleteModal
