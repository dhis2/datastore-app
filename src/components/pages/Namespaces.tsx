import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
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

const NamespacesPage = () => {
    const navigate = useNavigate()
    const { store } = useParams()

    const [activeTab, setActiveTab] = useState(store || 'dataStore')

    const handleSwitchTab = (selectedTab) => {
        setActiveTab(selectedTab)
        navigate(`/${selectedTab}`)
    }

    useEffect(() => {
        const storeOptions = ['dataStore', 'userDataStore']
        if (storeOptions.includes(store)) {
            setActiveTab(store)
        }
    }, [store])

    return (
        <div className={classes.firstPage}>
            <PageHeader>
                <span className={classes.firstPageHeader}>
                    {i18n.t('Configure Namespaces')}
                </span>
            </PageHeader>
            <div className={classes.firstPageContainer}>
                <DataStoreTabBar
                    activeTab={activeTab}
                    switchTab={handleSwitchTab}
                />
                {store === 'dataStore' && (
                    <NamespaceDataSection query={dataStoreNamespacesQuery} />
                )}
                {store === 'userDataStore' && (
                    <NamespaceDataSection
                        query={userDataStoreNamespacesQuery}
                    />
                )}
            </div>
        </div>
    )
}

export default NamespacesPage
