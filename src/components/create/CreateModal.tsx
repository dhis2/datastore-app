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
    saveFn,
    showNamespaceModal,
    showAddKeyModal,
    namespace,
    newKey,
    setNamespace,
    setNewKey,
    closeModal,
}) => {
    return (
        <Modal>
            <ModalTitle>Add New Namespace</ModalTitle>
            <ModalContent>
                {showNamespaceModal && (
                    <InputField
                        label="Namespace"
                        required
                        value={namespace}
                        onChange={({ value }) => setNamespace(value)}
                    />
                )}
                <InputField
                    label="Key"
                    required
                    value={newKey}
                    onChange={({ value }) => setNewKey(value)}
                />
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button
                        primary
                        onClick={() =>
                            saveFn({
                                newKey,
                                namespace,
                            })
                        }
                    >
                        {showAddKeyModal && i18n.t('Add Key')}
                        {showNamespaceModal && i18n.t('Add Namespace')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

CreateModal.propTypes = {
    closeModal: PropTypes.func,
    namespace: PropTypes.string,
    newKey: PropTypes.string,
    saveFn: PropTypes.func,
    setNamespace: PropTypes.func,
    setNewKey: PropTypes.func,
    showAddKeyModal: PropTypes.bool,
    showNamespaceModal: PropTypes.bool,
}

export default CreateModal
