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

type DiscardModalProps = {
    closeModal: () => void
    handleDiscard: () => void
}

const DiscardModal = ({ handleDiscard, closeModal }: DiscardModalProps) => {
    return (
        <Modal position="middle" onClose={closeModal}>
            <ModalTitle>{i18n.t('Discard')}</ModalTitle>
            <ModalContent>
                {i18n.t('Do you want to discard the unsaved changes?')}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={closeModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button destructive onClick={() => handleDiscard()}>
                        {i18n.t('Discard')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

export default DiscardModal
