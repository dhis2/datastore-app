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
import i18n from '../../../locales'
import { CreateFieldValues } from '../sidepanel/SidePanel'

type CreateModalProps = {
    createFn: (values) => void,
    values: CreateFieldValues,
    setValues: (values) => void,
    closeModal: () => void,
    title: string,
    type: string,
    buttonLabel: string
}

const CreateModal = ({
    createFn,
    values,
    setValues,
    closeModal,
    title,
    type,
    buttonLabel
}: CreateModalProps) => {
    return (
        <Modal>
            <ModalTitle>
                {title}
            </ModalTitle>
            <ModalContent>
                {type === 'namespace' && (
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
                    initialFocus={type !== 'namespace'}
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
                        {buttonLabel}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}
export default CreateModal
