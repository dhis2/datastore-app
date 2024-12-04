import {
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    Button,
    ButtonStrip,
    InputField,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'

const CreateModal = ({
    addNewKey,
    addNewNamespace,
    createFn,
    values,
    setValues,
    closeModal,
}) => {
    return (
        <Modal>
            <ModalTitle>
                {addNewKey && i18n.t('Add New Key')}
                {addNewNamespace && i18n.t('Add New Namespace')}
            </ModalTitle>
            <ModalContent>
                {addNewNamespace && (
                    <InputField
                        label={i18n.t("Namespace")}
                        required
                        initialFocus
                        value={values?.namespace}
                        onChange={({ value }) => {
                            setValues({
                                ...values,
                                ["namespace"]: value
                            })
                        }
                        }
                    />
                )}
                <InputField
                    label={i18n.t("Key")}
                    required
                    initialFocus={addNewKey}
                    value={values?.key}
                        onChange={({ value }) => {
                            setValues({
                                ...values,
                                ["key"]: value
                            })
                        }
                        }
                />
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={closeModal}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        primary
                        onClick={() =>
                            createFn(values)
                        }
                    >
                        {addNewKey && i18n.t('Add Key')}
                        {addNewNamespace && i18n.t('Add Namespace')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

CreateModal.propTypes = {
    addNewKey: PropTypes.bool,
    addNewNamespace: PropTypes.bool,
    createFn: PropTypes.func,
    values: PropTypes.object,
    setValues: PropTypes.func,
    closeModal: PropTypes.func
}

export default CreateModal
