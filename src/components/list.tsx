import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

interface QueryResults {
    results: []
}

const dataStoreQuery = {
    results: {
        resource: 'dataStore',
    },
}

const userDataStoreQuery = {
    results: {
        resource: 'userDataStore',
    },
}

function List({ data, error, loading }) {
    return (
        <div>
            {error && <div>Error fetching this data...</div>}
            {loading && <CircularLoader />}
            {data && (
                <pre>
                    {data.results.map((namespace) => namespace).join('\n')}
                </pre>
            )}
        </div>
    )
}

List.propTypes = {
    data: PropTypes.object,
    error: PropTypes.any,
    loading: PropTypes.any,
}

export function DataStoreList() {
    const { error, loading, data } = useDataQuery<QueryResults>(dataStoreQuery)

    return <List error={error} data={data} loading={loading} />
}

export function UserDataStoreList() {
    const { error, loading, data } =
        useDataQuery<QueryResults>(userDataStoreQuery)

    return <List error={error} data={data} loading={loading} />
}
