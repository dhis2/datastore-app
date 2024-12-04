import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import LinksList from './LinksList'

interface QueryResults {
    results: []
}

const userDataStoreQuery = {
    results: {
        resource: 'userDataStore',
    },
}

function UserDataStoreLinks() {
    const { error, loading, data, refetch } =
        useDataQuery<QueryResults>(userDataStoreQuery)

    return (
        <LinksList
            error={error}
            data={data}
            loading={loading}
            refetch={refetch}
        />
    )
}

export default UserDataStoreLinks
