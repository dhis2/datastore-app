import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import {
    DATASTORE,
    DATASTORE_OPTIONS,
    USERDATASTORE,
} from '../../constants/constants'
import i18n from '../../locales'
import DataStoreTabBar from '../buttons/DataStoreTabBar'
import PageHeader from '../header/PageHeader'
import NamespaceDataSection from '../sections/NamespaceDataSection'

const userDataStoreNamespacesQuery = {
    results: {
        resource: 'userDataStore',
    },
}

export const dataStoreNamespacesQuery = {
    results: {
        resource: 'dataStore',
    },
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
                <span
                    className={classes.firstPageHeader}
                    data-test="first-page-header"
                >
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
