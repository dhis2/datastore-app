import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import { Button } from '@dhis2-ui/button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useCustomAlert from '../../hooks/useCustomAlert'
import i18n from '../../locales'
import Error from '../Error'
import Editor from './Editor'

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

const Edit = () => {
    const { key, namespace, store } = useParams()
    const { showSuccess, showError } = useCustomAlert()

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
        JSON.stringify(data?.results, null, 4) || ''
    )

    const [updateKey, { loading }] = useDataMutation(
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
    }

    useEffect(() => {
        setValue(JSON.stringify(data?.results, null, 4))
    }, [data])

    useEffect(() => {
        refetch({ key, namespace })
    }, [key, namespace, store, refetch])

    if (error) {
        // throw new Response(error.message, {
        //     status: error.details.httpStatusCode,
        //     statusText: error.details.httpStatus,
        // })
        return <Error err={error.details} />
    }

    const loadingText = i18n.t('Loading')

    return (
        <div
            style={{
                border: '1px solid grey',
            }}
        >
            <Editor
                value={queryLoading ? `${loadingText}...` : value}
                handleChange={handleEditorChange}
            />
            <div
                style={{
                    position: 'absolute',
                    right: '0',
                }}
            >
                <Button
                    aria-label="Save"
                    name="save"
                    onClick={async () => {
                        await updateKey({
                            key,
                            namespace,
                            value,
                        })
                    }}
                    title="Save"
                    primary
                    loading={loading}
                >
                    {i18n.t('Save changes')}
                </Button>
            </div>
        </div>
    )
}

export default Edit
