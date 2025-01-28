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
import { useSidePanelContext } from '../../context/SidePanelContext'
import i18n from '../../locales'

const DeleteModal = ({
    handleDeleteAction,
}: {
    handleDeleteAction: () => void
}) => {
    const {
        panelType: type,
        totalItems,
        selectedLinkItem: value,
        setOpenDeleteModal,
    } = useSidePanelContext()
    const { namespace: currentNamespace } = useParams()

    const title =
        type === 'namespace' ? i18n.t('Delete Namespace') : i18n.t('Delete Key')

    return (
        <Modal position="middle">
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>
                {type === 'namespace' && (
                    <>
                        <p>
                            {i18n.t(
                                `Are you sure you want to delete '${value}'?`
                            )}
                        </p>
                        <p>
                            {i18n.t(
                                `This will delete all the keys in this namespace`
                            )}
                        </p>
                    </>
                )}
                {type === 'keys' && (
                    <>
                        <p>
                            {i18n.t(
                                `Are you sure you want to delete '${value}' in ${currentNamespace}?`
                            )}
                        </p>
                        {totalItems < 2 && (
                            <p>
                                {i18n.t(
                                    `This will also delete the namespace '${currentNamespace}'`
                                )}
                            </p>
                        )}
                    </>
                )}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={() => setOpenDeleteModal(false)}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        destructive
                        onClick={() => {
                            handleDeleteAction()
                            setOpenDeleteModal(false)
                        }}
                    >
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}
export default DeleteModal
