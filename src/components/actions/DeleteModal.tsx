import {
    Modal,
    ModalContent,
    ModalActions,
    ModalTitle,
    Button,
    ButtonStrip,
} from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import i18n from '../../locales'

type DeleteModalProps = {
    closeModal: () => void
    deleteFn: () => void
    children: React.ReactElement
}

const DeleteModal = ({ children, deleteFn, closeModal }: DeleteModalProps) => {
    const { store, namespace: currentNamespace } = useParams()
    const isKeyPage = Boolean(store && currentNamespace)
    const isNamespacePage = Boolean(store && !currentNamespace)
    return (
        <Modal position="middle">
            <ModalTitle>
                {isKeyPage && i18n.t('Delete Key')}
                {isNamespacePage && i18n.t('Delete Namespace')}
            </ModalTitle>
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
