import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
    InputField,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

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

    return (
        <Modal>
            <ModalTitle>
                {addNewKey && i18n.t('Add New Key')}
                {addNewNamespace && i18n.t('Add New Namespace')}
            </ModalTitle>
            <ModalContent>
                {addNewNamespace && (
                    <InputField
                        label={i18n.t('Namespace')}
                        required
                        initialFocus
                        value={values?.namespace}
                        onChange={({ value }) => {
                            setValues({
                                ...values,
                                ['namespace']: value,
                            })
                        }}
                    />
                )}
                <InputField
                    label={i18n.t('Key')}
                    required
                    initialFocus={addNewKey}
                    value={values?.key}
                    onChange={({ value }) => {
                        setValues({
                            ...values,
                            ['key']: value,
                        })
                    }}
                />
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={closeModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button primary onClick={() => createFn(values)}>
                        {addNewKey && i18n.t('Add Key')}
                        {addNewNamespace && i18n.t('Add Namespace')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

export default CreateModal
