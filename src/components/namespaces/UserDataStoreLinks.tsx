import { useDataQuery } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
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

function UserDataStoreLinks({ store }) {
    const { error, loading, data } =
        useDataQuery<QueryResults>(userDataStoreQuery)

    return (
        <LinksList store={store} error={error} data={data} loading={loading} />
    )
}

UserDataStoreLinks.propTypes = {
    store: PropTypes.string,
}

export default UserDataStoreLinks
