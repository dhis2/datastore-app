import { useDataQuery } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
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

function DataStoreLinks({ store }) {
    const { error, loading, data } = useDataQuery<QueryResults>(dataStoreQuery)

    return (
        <LinksList store={store} error={error} data={data} loading={loading} />
    )
}

DataStoreLinks.propTypes = {
    store: PropTypes.string,
}

export default DataStoreLinks
