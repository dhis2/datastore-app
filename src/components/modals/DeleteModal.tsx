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
import { DeleteModalProps } from './types'

const DeleteModal: React.FC<DeleteModalProps> = ({
    handleDelete,
    closeModal,
    title,
    type,
    activeNamespace,
    activeKey,
    deleteNamespace,
}) => {
    return (
        <Modal position="middle" dataTest="delete-modal">
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>
                {type === 'namespace' && (
                    <>
                        <p>
                            {i18n.t(
                                `Are you sure you want to delete '${activeNamespace}'?`
                            )}
                        </p>
                        <p>
                            {i18n.t(
                                `This will delete all the keys in this namespace`
                            )}
                        </p>
                    </>
                )}
                {type === 'key' && (
                    <>
                        <p>
                            {i18n.t(
                                `Are you sure you want to delete '${activeKey}' in ${activeNamespace}?`
                            )}
                        </p>
                        {deleteNamespace && (
                            <p>
                                {i18n.t(
                                    `This will also delete the namespace '${activeNamespace}'`
                                )}
                            </p>
                        )}
                    </>
                )}
            </ModalContent>
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
