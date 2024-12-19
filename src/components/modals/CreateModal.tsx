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
import i18n from '../../locales'

const { Form } = ReactFinalForm

interface FieldValues {
    key: string
    namespace?: string
}

interface CreateModalProps {
    closeModal: () => void
    handleCreate: (FieldValues) => void
    children: React.ReactNode
    title: string
}

const CreateModal = ({
    handleCreate,
    closeModal,
    children,
    title,
}: CreateModalProps) => {
    const onSubmit = (values) => {
        handleCreate(values)
    }

    return (
        <Modal>
            <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalTitle>{title}</ModalTitle>
                        <ModalContent>{children}</ModalContent>
                        <ModalActions>
                            <ButtonStrip end>
                                <Button secondary onClick={closeModal}>
                                    {i18n.t('Cancel')}
                                </Button>
                                <Button primary type="submit">
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
