import { useDataEngine } from '@dhis2/app-service-data'
import { Button, Divider } from '@dhis2/ui'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import CreateModal from './CreateModal'

const Toolbar = () => {
    const { store, namespace } = useParams()
    const engine = useDataEngine()
    const navigate = useNavigate()

    const [addNewNamespace, setAddNewNamespace] = useState(false)
    const [addNewKey, setAddNewKey] = useState(false)
    const [values, setValues] = useState({})

    const { showSuccess, showError } = useCustomAlert()

    const handleAddNamespaceOrKey = async (values: {
        namespace?: string
        key?: unknown
    }) => {
        let resource = ''
        if (addNewNamespace) {
            resource = `${store}/${values?.namespace}/${values?.key}`
        } else if (addNewKey) {
            resource = `${store}/${namespace}/${values?.key}`
        }

        await engine.mutate(
            {
                type: 'create',
                resource,
                data: () => ({}),
            },
            {
                onComplete: () => {
                    let url = ''
                    if (addNewNamespace) {
                        url = `${store}/edit/${values?.namespace}/${values?.key}`
                    } else if (addNewKey) {
                        url = `${store}/edit/${namespace}/${values?.key}`
                    }
                    const message = i18n.t('Key created successfully')
                    showSuccess(message)
                    navigate(url)
                    setValues({})
                },
                onError: () => {
                    const message = i18n.t(
                        'There was an error creating the key'
                    )
                    showError(message)
                },
            }
        )
        closeModal()
    }

    const closeModal = () => {
        setAddNewKey(false)
        setAddNewNamespace(false)
    }

    return (
        <>
            {store && (
                <>
                    <div className={classes.toolbar}>
                        <Button
                            aria-label={i18n.t('Add new namespace')}
                            name="New namespace button"
                            onClick={() => {
                                setAddNewNamespace(true)
                            }}
                            title={i18n.t('New namespace')}
                        >
                            {i18n.t('Add new namespace')}
                        </Button>
                        {namespace && (
                            <Button
                                aria-label={i18n.t('Add new key')}
                                name="New key button"
                                onClick={() => {
                                    setAddNewKey(true)
                                }}
                                title={i18n.t('New key')}
                            >
                                {i18n.t('Add new key')}
                            </Button>
                        )}
                    </div>
                    <Divider />
                </>
            )}
            {(addNewKey || addNewNamespace) && (
                <CreateModal
                    addNewKey={addNewKey}
                    addNewNamespace={addNewNamespace}
                    createFn={handleAddNamespaceOrKey}
                    closeModal={closeModal}
                    values={values}
                    setValues={setValues}
                />
            )}
        </>
    )
}

export default Toolbar
