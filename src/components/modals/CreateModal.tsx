import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
    ReactFinalForm,
} from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'
import KeyField from '../fields/KeyField'
import NamespaceField from '../fields/NamespaceField'
import { CreateModalProps, ModalFieldValues } from './types'

const { Form } = ReactFinalForm

const CreateModal: React.FC<CreateModalProps> = ({
    handleCreate,
    closeModal,
    type,
    title,
}) => {
    const onSubmit = (values: ModalFieldValues) => {
        handleCreate(values)
    }

    const showNamespaceField = type === 'namespace'

    return (
        <Modal position="middle" dataTest="create-modal">
            <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalTitle>{title}</ModalTitle>
                        <ModalContent>
                            <div
                                className={
                                    showNamespaceField
                                        ? classes.namespaceModalFields
                                        : undefined
                                }
                            >
                                {showNamespaceField && (
                                    <NamespaceField initialFocus />
                                )}
                                <KeyField initialFocus={type === 'key'} />
                            </div>
                        </ModalContent>
                        <ModalActions>
                            <ButtonStrip end>
                                <Button
                                    secondary
                                    onClick={closeModal}
                                    dataTest="cancel-btn"
                                >
                                    {i18n.t('Cancel')}
                                </Button>
                                <Button
                                    primary
                                    type="submit"
                                    dataTest="add-btn"
                                >
                                    {i18n.t('Add')}
                                </Button>
                            </ButtonStrip>
                        </ModalActions>
                    </form>
                )}
            </Form>
        </Modal>
    )
}

export default CreateModal
