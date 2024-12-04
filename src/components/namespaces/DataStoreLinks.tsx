import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import LinksList from './LinksList'

interface QueryResults {
    results: []
}

const dataStoreQuery = {
    results: {
        resource: 'dataStore',
    },
}

function DataStoreLinks() {
    const { error, loading, data, refetch } =
        useDataQuery<QueryResults>(dataStoreQuery)

    return (
        <LinksList
            error={error}
            data={data}
            loading={loading}
            refetch={refetch}
        />
    )
}

export default DataStoreLinks
