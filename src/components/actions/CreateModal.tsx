import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
    ReactFinalForm,
    InputFieldFF,
    hasValue,
    composeValidators,
    alphaNumeric,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

const { Form, Field } = ReactFinalForm

type FieldValues = {
    key?: string
    namespace?: string
}

type CreateModalProps = {
    closeModal: () => void
    createFn: (FieldValues) => void
    setValues: (FieldValues) => void
    values: FieldValues
    type: string
}

const CreateModal = ({
    createFn,
    values,
    setValues,
    closeModal,
    type,
}: CreateModalProps) => {
    const addNewKey = type === 'key'
    const addNewNamespace = type === 'namespace'

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <Modal>
            <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalTitle>
                            {addNewKey && i18n.t('Add New Key')}
                            {addNewNamespace && i18n.t('Add New Namespace')}
                        </ModalTitle>
                        <ModalContent>
                            {addNewNamespace && (
                                <Field
                                    name="namespace"
                                    component={InputFieldFF}
                                    required
                                    label="Namespace"
                                    validate={composeValidators(
                                        hasValue,
                                        alphaNumeric
                                    )}
                                    initialFocus={addNewNamespace}
                                />
                            )}
                            <Field
                                name="key"
                                component={InputFieldFF}
                                required
                                label="key"
                                validate={composeValidators(
                                    hasValue,
                                    alphaNumeric
                                )}
                                initialFocus={addNewKey}
                            />
                        </ModalContent>
                        <ModalActions>
                            <ButtonStrip end>
                                <Button secondary onClick={closeModal}>
                                    {i18n.t('Cancel')}
                                </Button>
                                <Button
                                    primary
                                    onClick={() => createFn(values)}
                                >
                                    {addNewKey && i18n.t('Add Key')}
                                    {addNewNamespace && i18n.t('Add Namespace')}
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
