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
import { useSidePanelContext } from '../../context/SidePanelContext'
import i18n from '../../locales'
import { CreateFieldValues } from '../sidepanel/SidePanel'

type CreateModalProps = {
    createFn: (values) => void
    values: CreateFieldValues
    setValues: (values) => void
    closeModal: () => void
}

const CreateModal = ({
    createFn,
    values,
    setValues,
    closeModal,
}: CreateModalProps) => {
    const { panelType: type } = useSidePanelContext()

    const title =
        type === 'namespace'
            ? i18n.t('Add New Namespace')
            : i18n.t('Add New Key')
    const buttonLabel =
        type === 'namespace' ? i18n.t('Add Namespace') : i18n.t('Add Key')

    return (
        <Modal position="middle">
            <ModalTitle>{title}</ModalTitle>
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
