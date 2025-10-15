import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { Center, CircularLoader } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import { useEditContext } from '../context/EditContext'
import Editor from '../editor/Editor'
import ErrorNotice from '../error/ErrorNotice'
import EditPanelHeader from '../header/EditPanelHeader'
import { dataStoreKeyValuesQuery } from '../panels/EditorPanel'

type EditSectionProps = {
    query: typeof dataStoreKeyValuesQuery
}

const EditSection = ({ query }: EditSectionProps) => {
    const { key, namespace, store } = useParams()
    const engine = useDataEngine()
    const navigate = useNavigate()

    const [editError, setEditError] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    const { showError, showSuccess } = useCustomAlert()

    const { setHasUnsavedChanges, hasUnsavedChanges } = useEditContext()

    const {
        data,
        loading: queryLoading,
        refetch,
        error: fetchError,
    } = useDataQuery(query, {
        variables: {
            key,
            namespace,
        },
    })

    const handleClose = () => navigate(`/${store}/edit/${namespace}`)

    const [editorValue, setEditorValue] = useState(
        JSON.stringify(data?.results, null, 4) || ''
    )

    useEffect(() => {
        setEditorValue(JSON.stringify(data?.results, null, 4))
    }, [data])

    const handleEditorChange = (value) => {
        setEditorValue(value)
        setHasUnsavedChanges(true)
    }

    const handleUpdate = async () => {
        if (hasUnsavedChanges) {
            let body
            const resource = `${store}`
            setEditError(null)
            setUpdateLoading(true)

            try {
                body = JSON.parse(editorValue)
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
    }

    useEffect(() => {
        refetch({
            key,
            namespace,
        })
    }, [store, namespace, key, refetch])

    const renderComponent = () => {
        let childComponent
        if (fetchError) {
            childComponent = (
                <ErrorNotice
                    message={i18n.t(
                        "There was a problem fetching this key's value. {{error}}",
                        {
                            error: fetchError.message,
                            interpolation: { escapeValue: false },
                        }
                    )}
                />
            )
        } else if (queryLoading) {
            childComponent = (
                <Center>
                    <CircularLoader />
                </Center>
            )
        } else {
            childComponent = (
                <Editor
                    loading={updateLoading}
                    value={editorValue}
                    handleEditorChange={handleEditorChange}
                />
            )
        }
        return childComponent
    }

    return (
        <>
            <EditPanelHeader
                handleClose={handleClose}
                disableCloseButton={updateLoading}
                handleUpdate={handleUpdate}
                loading={!editError && updateLoading}
                showButtons={!fetchError}
            />

            <div className={classes.editorBackground}>{renderComponent()}</div>
        </>
    )
}

export default EditSection
