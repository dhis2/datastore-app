import { useDataQuery } from '@dhis2/app-runtime'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MainSection from './MainSection'

interface QueryResults {
    results: []
}

const userDataStoreKeysQuery = {
    results: {
        resource: 'userDataStore',
        id: ({ id }) => id,
    },
}

const dataStoreKeysQuery = {
    results: {
        resource: 'dataStore',
        id: ({ id }) => id,
    },
}

export const DataStoreKeys = () => {
    const { namespace } = useParams()

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        dataStoreKeysQuery,
        {
            variables: {
                id: namespace,
            },
        }
    )

    useEffect(() => {
        refetch({ id: namespace })
    }, [namespace])

    return (
        <MainSection loading={loading} error={error} data={data} type="key" />
    )
}

export const UserDataStoreKeys = () => {
    const { namespace } = useParams()

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        userDataStoreKeysQuery,
        {
            variables: {
                id: namespace,
            },
        }
    )

    useEffect(() => {
        refetch({ id: namespace })
    }, [namespace])

    return (
        <MainSection data={data} loading={loading} error={error} type="key" />
    )
}
