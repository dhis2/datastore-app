import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { Center, CircularLoader } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import useDiscardAlert from '../../hooks/useDiscardAlert'
import i18n from '../../locales'
import { useEditContext } from '../context/EditContext'
import EditPanelHeader from '../header/EditPanelHeader'
import Editor from './Editor'

const EditSection = ({ query }) => {
    const { key, namespace, store } = useParams()
    const engine = useDataEngine()
    const navigate = useNavigate()

    const [editError, setEditError] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    const { showError, showSuccess } = useCustomAlert()
    const discardAlert = useDiscardAlert()

    const { hasUnsavedChanges, setHasUnsavedChanges } = useEditContext()

    const { data, loading, refetch } = useDataQuery(query, {
        variables: {
            key,
            namespace,
        },
        onError(error) {
            showError(
                i18n.t('There was a problem fetching this data - {{error}}', {
                    error: error.message,
                    interpolation: { escapeValue: false },
                })
            )
        },
    })

    const [value, setValue] = useState(
        JSON.stringify(data?.results, null, 4) || ''
    )

    const handleEditorChange = (value) => {
        setValue(value)
        setHasUnsavedChanges(true)
    }

    const handleClose = () => {
        const handler = () => {
            setHasUnsavedChanges(null)
            navigate(`/${store}/edit/${namespace}`)
        }
        if (hasUnsavedChanges) {
            discardAlert.show({
                onConfirm: handler,
            })
        } else {
            handler()
        }
    }

    const handleUpdate = async () => {
        let body
        const resource = `${store}`
        setEditError(null)
        setUpdateLoading(true)

        try {
            body = JSON.parse(value)
            await engine.mutate(
                {
                    type: 'update' as const,
                    resource: resource,
                    id: `${namespace}/${key}`,
                    data: body,
                },
                {
                    onComplete: () => {
                        showSuccess(
                            i18n.t("Key '{{key}}' updated successfully", {
                                key,
                            })
                        )
                        refetch({
                            key,
                            namespace,
                        })
                        setHasUnsavedChanges(false)
                    },
                    onError(error) {
                        showError(
                            i18n.t(
                                'There was a problem updating the key - {{error}}',
                                {
                                    error: error.message,
                                    interpolation: { escapeValue: false },
                                }
                            )
                        )
                    },
                }
            )
        } catch (error) {
            setEditError(error.message)
            showError(
                i18n.t('There was a problem - {{error}}', {
                    error: error.message,
                    interpolation: { escapeValue: false },
                })
            )
        }
        setUpdateLoading(false)
    }

    useEffect(() => {
        setValue(JSON.stringify(data?.results, null, 4))
    }, [data])

    useEffect(() => {
        refetch({
            key,
            namespace,
        })
    }, [store, namespace, key, refetch])

    return (
        <>
            <EditPanelHeader
                handleClose={handleClose}
                disableCloseButton={updateLoading}
                handleUpdate={handleUpdate}
                loading={!editError && updateLoading}
            />
            <div className={classes.editorBackground}>
                {loading ? (
                    <Center>
                        <CircularLoader />
                    </Center>
                ) : (
                    <Editor value={value} handleChange={handleEditorChange} />
                )}
            </div>
        </>
    )
}

export default EditSection
