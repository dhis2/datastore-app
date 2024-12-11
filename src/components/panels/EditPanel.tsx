import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import { Button } from '@dhis2-ui/button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import ErrorComponent from '../error/ErrorComponent'
import PanelEditor from '../sidepanel/PanelEditor'
import { PanelHeader } from '../sidepanel/PanelHeader'

const modifyKeyMutation = ({ store }) => ({
    type: 'update' as const,
    resource: `${store}`,
    id: ({ key, namespace }: { key: string; namespace: string }) =>
        `${namespace}/${key}`,
    data: ({ value }) => JSON.parse(value),
})

const keyValuesQuery = ({ store }: { store: string }) => ({
    results: {
        resource: `${store}`,
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
})

const EditPanel = () => {
    const { key, namespace, store } = useParams()
    const { showSuccess, showError } = useCustomAlert()
    // const [ updateError, setUpdateError ] = useState(null)

    const {
        data,
        loading: queryLoading,
        error,
        refetch,
    } = useDataQuery(keyValuesQuery({ store }), {
        variables: {
            key,
            namespace,
        },
    })

    const [value, setValue] = useState(
        'Select a namespace and key to edit its values'
    )

    const [updateKey, { loading: mutationLoading }] = useDataMutation(
        // @ts-expect-error("")
        modifyKeyMutation({ store }),
        {
            onComplete: () => {
                const message = i18n.t('Key successfully updated')
                showSuccess(message)
            },
            onError: () => {
                const message = i18n.t('There was an error updating the key')
                showError(message)
            },
        }
    )

    const handleEditorChange = (value) => {
        setValue(value)
        // setUpdateError(null)
    }

    const handleUpdate = async () => {
        // setUpdateError(null)
        try {
            await updateKey({
                key,
                namespace,
                value,
            })
        } catch (error) {
            // setUpdateError(error.message)
            const message = i18n.t('There was an error updating the key')
            showError(message)
        }
    }

    useEffect(() => {
        setValue(JSON.stringify(data?.results, null, 4))
    }, [data])

    useEffect(() => {
        refetch({ key, namespace })
    }, [key, namespace, store, refetch])

    if (error) {
        return <ErrorComponent err={error.details} />
    }

    const loadingText = `${i18n.t('Loading')}...`

    return (
        <>
            <PanelHeader>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span
                        style={{
                            fontSize: '15px',
                            fontWeight: '700',
                        }}
                    >
                        {key && key}
                    </span>

                    <Button
                        aria-label="Save"
                        name="save"
                        onClick={handleUpdate}
                        title="Save"
                        primary
                        small
                        loading={mutationLoading}
                    >
                        {i18n.t('Save changes')}
                    </Button>
                </div>
            </PanelHeader>
            <PanelEditor
                value={queryLoading ? loadingText : value}
                handleChange={handleEditorChange}
            />
        </>
    )
}

export default EditPanel
