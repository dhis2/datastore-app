import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import { Button } from '@dhis2-ui/button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import i18n from '../../locales'
import Editor from './Editor'

const modifyKeyMutation = ({ store }) => ({
    type: 'update' as const,
    resource: `${store}`,
    id: ({ key, namespace }: { key: string, namespace: string }) => `${namespace}/${key}`,
    data: ({ value }) => JSON.parse(value),
})

const keyValuesQuery = ({
    store
}: {
    store: string
}) => ({
    results: {
        resource: `${store}`,
        id: ({ key, namespace }: { key: string, namespace: string }) => `${namespace}/${key}`,
    },
})

const Edit = () => {
    const { key, namespace, store } = useParams()

    const {
        data,
        loading: queryLoading,
        refetch,
    } = useDataQuery(keyValuesQuery({ store }), {
        variables: {
            key,
            namespace
        },
    })

    const [value, setValue] = useState(
        JSON.stringify(data?.results, null, 4) || ''
    )

    const saveChanges = () => {
        // todo: show alert
        console.log('show success alert')
    }

    const [updateKey, { loading }] = useDataMutation(
        // @ts-expect-error("")
        modifyKeyMutation({ store }),
        {
            onComplete: saveChanges,
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

    const loadingText = i18n.t("Loading")

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
