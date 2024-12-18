import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'
import CenteredLoader from '../loader/Loader'
import ItemsTable from '../table/ItemsTable'
import SearchField from './SearchField'

interface QueryResults {
    results: []
}

const KeysDataSection = ({ query }) => {
    const { namespace: currentNamespace } = useParams()

    const { error, loading, data } = useDataQuery<QueryResults>(query, {
        variables: {
            id: currentNamespace,
        },
    })

    if (error) {
        return <ErrorNotice />
    }

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <>
            <div className={classes.keysPanelMidSection}>
                <SearchField placeholder={i18n.t('Search keys')} />
            </div>
            <div>
                {data && <ItemsTable data={data} label={i18n.t('Key')} />}
            </div>
        </>
    )
}

export default KeysDataSection
