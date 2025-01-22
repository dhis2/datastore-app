import { useDataQuery } from '@dhis2/app-runtime'
import { IconAdd24, colors } from '@dhis2/ui'
import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'
import CenteredLoader from '../loader/Loader'
import ItemsTable from '../table/ItemsTable'
import CreateButton from './CreateButton'
import SearchField from './SearchField'

interface QueryResults {
    results: []
}

const NamespaceDataSection = ({ query }) => {
    const { error, loading, data } = useDataQuery<QueryResults>(query)

    if (error) {
        return <ErrorNotice />
    }

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <>
            <div className={classes.midSection}>
                <SearchField placeholder={i18n.t('Search namespaces')} />
                <CreateButton
                    label={i18n.t('New namespace')}
                    handleClick={() => console.log('create new namespace')}
                    icon={<IconAdd24 color={colors.grey600} />}
                />
            </div>
            <div>
                {data && <ItemsTable data={data} label={i18n.t('Namespace')} />}
            </div>
        </>
    )
}

export default NamespaceDataSection
