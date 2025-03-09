import { useAlert, useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import EditPanelHeader from '../header/EditPanelHeader'
import Editor from './Editor'

const EditSection = ({ query }) => {
    const { key, namespace, store } = useParams()
    const engine = useDataEngine()
    const navigate = useNavigate()

    const { showError, showSuccess } = useCustomAlert()

    const [editError, setEditError] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

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
    }

    const closeEditorAlert = useAlert(i18n.t('Discard these changes?'), {
        warning: true,
        actions: [
            {
                label: i18n.t('Confirm'),
                onClick: () => navigate(`/${store}/edit/${namespace}`),
            },
            {
                label: i18n.t('Cancel'),
                onClick: () => closeEditorAlert.hide(),
            },
        ],
    })

    const handleClose = () => {
        if (JSON.stringify(data?.results, null, 4) === value) {
            navigate(`/${store}/edit/${namespace}`)
        } else {
            closeEditorAlert.show()
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
        <div>
            <EditPanelHeader
                handleClose={handleClose}
                disableCloseButton={updateLoading}
                handleUpdate={handleUpdate}
                loading={!editError && updateLoading}
            />
            <Editor
                value={loading ? i18n.t('Loading') : value}
                handleChange={handleEditorChange}
                active
            />
        </div>
    )
}

export default EditSection
