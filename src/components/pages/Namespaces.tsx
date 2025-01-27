import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import {
    DATASTORE,
    DATASTORE_OPTIONS,
    USERDATASTORE,
} from '../../constants/constants'
import i18n from '../../locales'
import PageHeader from '../header/PageHeader'
import DataStoreTabBar from '../sections/DataStoreTabBar'
import NamespaceDataSection from '../sections/NamespaceDataSection'

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

export type FieldValues = {
    namespace?: string
    key?: string
}

const NamespacesPage = () => {
    const navigate = useNavigate()
    const { store } = useParams()

    const [activeTab, setActiveTab] = useState(store || DATASTORE)

    const handleSwitchTab = (selectedTab) => {
        setActiveTab(selectedTab)
        navigate(`/${selectedTab}`)
    }

    useEffect(() => {
        if (DATASTORE_OPTIONS.includes(store)) {
            setActiveTab(store)
        }
    }, [store])

    return (
        <div className={classes.firstPage}>
            <PageHeader>
                <span className={classes.firstPageHeader}>
                    {i18n.t('Namespaces')}
                </span>
            </PageHeader>
            <div className={classes.firstPageContainer}>
                <DataStoreTabBar
                    activeTab={activeTab}
                    switchTab={handleSwitchTab}
                />
                <div className={classes.namespaceDataContainer}>
                    {store === DATASTORE && (
                        <NamespaceDataSection
                            query={dataStoreNamespacesQuery}
                        />
                    )}
                    {store === USERDATASTORE && (
                        <NamespaceDataSection
                            query={userDataStoreNamespacesQuery}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default NamespacesPage
