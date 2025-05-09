import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import { Center, CircularLoader } from '@dhis2/ui'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import { useEditContext } from '../context/EditContext'
import Editor from '../editor/Editor'
import EditPanelHeader from '../header/EditPanelHeader'
import { dataStoreKeyValuesQuery } from '../panels/EditorPanel'

type EditSectionProps = {
    query: typeof dataStoreKeyValuesQuery
}

const EditSection = ({ query }: EditSectionProps) => {
    const { key, namespace, store } = useParams()
    const engine = useDataEngine()
    const navigate = useNavigate()

    const editorRef = useRef(null)
    const editorView = editorRef.current
    const setEditorView = (view) => {
        editorRef.current = view
    }

    const [editError, setEditError] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    const { showError, showSuccess } = useCustomAlert()

    const { setHasUnsavedChanges } = useEditContext()

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

    const handleClose = () => navigate(`/${store}/edit/${namespace}`)

    const handleUpdate = async () => {
        let body
        const resource = `${store}`
        setEditError(null)
        setUpdateLoading(true)

        if (!editorView) {
            return
        }

        try {
            body = JSON.parse(editorView.state.doc.toString())
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
                    <Editor
                        value={JSON.stringify(data?.results, null, 4) || '{}'}
                        setEditorView={setEditorView}
                    />
                )}
            </div>
        </>
    )
}

export default EditSection
