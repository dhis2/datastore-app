import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import { SidebarNavLink } from '../sidebar/sidebar'

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

function List({ data, error, loading, store }) {
    return (
        <div className={classes.sidebarList}>
            {error && <span>{i18n.t('ERROR')}</span>}
            {loading && <CircularLoader />}
            {data && (
                <>
                    <h4 className={classes.bottom}>{i18n.t('Namespaces')}</h4>
                    {data.results.map((namespace: string, index) => {
                        return (
                            <SidebarNavLink
                                key={`${index}-${namespace}`}
                                to={`/${store}/${namespace}`}
                                label={namespace}
                            />
                        )
                    })}
                </>
            )}
        </div>
    )
}

List.propTypes = {
    data: PropTypes.object,
    error: PropTypes.any,
    loading: PropTypes.any,
    store: PropTypes.string,
}

export function DataStoreList({ store }) {
    const { error, loading, data } = useDataQuery<QueryResults>(dataStoreQuery)

    return <List store={store} error={error} data={data} loading={loading} />
}

DataStoreList.propTypes = {
    store: PropTypes.string,
}

export function UserDataStoreList({ store }) {
    const { error, loading, data } =
        useDataQuery<QueryResults>(userDataStoreQuery)

    return <List store={store} error={error} data={data} loading={loading} />
}

UserDataStoreList.propTypes = {
    store: PropTypes.string,
}

export function NameSpaceLinks() {
    const { store } = useParams()

    if (store === 'userDataStore') {
        return <UserDataStoreList store={store} />
    }

    if (store === 'dataStore') {
        return <DataStoreList store={store} />
    }
}
