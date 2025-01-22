import { useDataQuery } from '@dhis2/app-runtime'
import { IconAdd16, colors } from '@dhis2/ui'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import ErrorNotice from '../error/ErrorNotice'
import PanelHeader from '../header/PanelHeader'
import CenteredLoader from '../loader/Loader'
import ItemsTable from '../table/ItemsTable'
import CreateButton from './CreateButton'
import SearchField from './SearchField'

interface QueryResults {
    results: []
}

const KeysDataSection = ({ query }) => {
    const { store, namespace: currentNamespace } = useParams()

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        query,
        {
            variables: {
                id: currentNamespace,
            },
        }
    )

    useEffect(() => {
        refetch({ id: currentNamespace })
    }, [currentNamespace])

    if (error) {
        return <ErrorNotice />
    }

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <>
            <PanelHeader>
                <div className={classes.keysHeaderLabel}>
                    <Link to={`/${store}`} className={classes.keysHeaderLink}>
                        <span>
                            {store === 'dataStore' && 'DataStore'}
                            {store === 'userDataStore' && 'UserDatastore'}
                        </span>
                    </Link>
                    <span className={classes.keysHeaderLabelDivider}>/</span>

                    <span className={classes.keysPanelHeader}>
                        {currentNamespace}
                    </span>
                </div>
                <CreateButton
                    label={i18n.t('New Key')}
                    handleClick={() => console.log('create new key')}
                    icon={<IconAdd16 color={colors.grey600} />}
                />
            </PanelHeader>
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
