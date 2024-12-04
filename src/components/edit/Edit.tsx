import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import { Button } from '@dhis2-ui/button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from './Editor'

const useSaveChangesMutation = ({ store, namespace, mutationOptions }) => {
    return useDataMutation(
        // @ts-expect-error("")
        {
            type: 'update',
            resource: `${store}/${namespace}`,
            id: ({ id }) => id,
            data: ({ data }) => {
                console.log(data)
                return {
                    data: JSON.parse(data),
                }
            },
        },
        mutationOptions
    )
}

const useFetchKeyValueQuery = ({ store, namespace, key }) => {
    return useDataQuery(
        {
            results: {
                resource: `${store}/${namespace}`,
                id: ({ id }) => id,
            },
        },
        {
            variables: {
                id: key,
            },
        }
    )
}

const Edit = () => {
    const { key, namespace, store } = useParams()
    const { data, refetch } = useFetchKeyValueQuery({ store, namespace, key })

    const [value, setValue] = useState(
        JSON.stringify(data?.results?.['data'], null, 4) || ''
    )
    const onChange = (value) => {
        setValue(value)
    }

    const saveChanges = () => {
        // todo: show alert
        console.log('save edited key stuff')
    }

    useEffect(() => {
        refetch({ id: key })
    }, [key, namespace, store])

    useEffect(() => {
        setValue(JSON.stringify(data?.results?.['data'], null, 4))
    }, [data])

    const mutationOptions = {
        onComplete: saveChanges,
    }

    const [mutate, { loading }] = useSaveChangesMutation({
        store,
        namespace,
        mutationOptions,
    })

    return (
        <div
            style={{
                border: '1px solid grey',
            }}
        >
            <Editor value={value} handleChange={onChange} />
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
                        await mutate({
                            id: key,
                            data: value,
                        })
                    }}
                    title="Save"
                    primary
                    loading={loading}
                >
                    Save changes
                </Button>
            </div>
        </div>
    )
}

export default Edit
