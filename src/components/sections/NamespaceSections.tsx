import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import MainSection from './MainSection'

interface QueryResults {
    results: []
}

const userDataStoreNamespacesQuery = {
    results: {
        resource: 'userDataStore',
    },
}

const dataStoreNamespacesQuery = {
    results: {
        resource: 'dataStore',
    },
}

export const DataStoreNamespaces = () => {
    const { error, loading, data } = useDataQuery<QueryResults>(
        dataStoreNamespacesQuery
    )

    return (
        <MainSection
            error={error}
            loading={loading}
            data={data}
            type="namespace"
        />
    )
}

export const UserDataStoreNamespaces = () => {
    const { error, loading, data } = useDataQuery<QueryResults>(
        userDataStoreNamespacesQuery
    )

    return (
        <MainSection
            data={data}
            type="namespace"
            loading={loading}
            error={error}
        />
    )
}
