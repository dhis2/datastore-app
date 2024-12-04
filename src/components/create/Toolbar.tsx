import { useDataEngine } from '@dhis2/app-service-data'
import { Button, Divider } from '@dhis2/ui'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import CreateModal from './CreateModal'

const Toolbar = () => {
    const { store, namespace } = useParams()

    const [showAddNamespaceModal, setShowAddNamespaceModal] = useState(false)
    const [showAddKeyModal, setShowAddKeyModal] = useState(false)
    const [newNamespace, setNewNamespace] = useState('')
    const [newKey, setNewKey] = useState('')

    const engine = useDataEngine()
    const navigate = useNavigate()

    const handleAddNamespace = async (values: {
        namespace?: string
        newKey?: unknown
    }) => {
        let resource = `${store}`
        if (showAddNamespaceModal) {
            resource = `${resource}/${values?.namespace}/${values?.newKey}`
        } else if (showAddKeyModal) {
            resource = `${resource}/${namespace}/${values?.newKey}`
        }

        await engine.mutate(
            {
                type: 'create',
                resource,
                data: () => ({}),
            },
            {
                onComplete: () => {
                    if (showAddNamespaceModal) {
                        navigate(
                            `${store}/${values?.namespace}/edit/${values?.newKey}`
                        )
                    } else if (showAddKeyModal) {
                        navigate(`${store}/${namespace}/edit/${values?.newKey}`)
                    }
                    setNewKey('')
                    setNewNamespace('')
                },
            }
        )

        handleCloseModal()
    }

    const handleCloseModal = () => {
        setShowAddNamespaceModal(false)
        setShowAddKeyModal(false)
    }

    return (
        <>
            {store && (
                <>
                    <div className={classes.toolbar}>
                        <Button
                            aria-label="Add new namespace"
                            name="New namespace button"
                            onClick={() => {
                                setShowAddNamespaceModal(true)
                            }}
                            title="New namespace"
                        >
                            {i18n.t('Add new namespace')}
                        </Button>
                        {namespace && (
                            <Button
                                aria-label="Add new key"
                                name="New key button"
                                onClick={() => {
                                    setShowAddKeyModal(true)
                                }}
                                title="New key"
                            >
                                {i18n.t('Add new key')}
                            </Button>
                        )}
                    </div>
                    <Divider />
                </>
            )}
            {(showAddNamespaceModal || showAddKeyModal) && (
                <CreateModal
                    showNamespaceModal={showAddNamespaceModal}
                    showAddKeyModal={showAddKeyModal}
                    saveFn={handleAddNamespace}
                    closeModal={handleCloseModal}
                    namespace={newNamespace}
                    setNamespace={setNewNamespace}
                    newKey={newKey}
                    setNewKey={setNewKey}
                />
            )}
        </>
    )
}

export default Toolbar
