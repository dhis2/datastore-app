import { useAlert, useDataQuery } from '@dhis2/app-runtime'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from './Editor'

const EditorSection = ({ query }) => {
    const { key, namespace, store } = useParams()
    const { show: showError } = useAlert('An error fetching this data', {
        critical: true,
    })

    const { data, loading, refetch } = useDataQuery(query, {
        variables: {
            key,
            namespace,
        },
        onError: () => showError(),
    })

    const [value, setValue] = useState(
        JSON.stringify(data?.results, null, 4) || ''
    )

    useEffect(() => {
        setValue(JSON.stringify(data?.results, null, 4))
    }, [data])

    useEffect(() => {
        refetch({
            key,
            namespace,
        })
    }, [store, namespace, key])

    return (
        <div>
            <Editor
                value={loading ? 'Loading...' : value}
                handleChange={() => console.log('editor changes')}
            />
        </div>
    )
}

export default EditorSection
