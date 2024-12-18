import { IconAdd24, colors } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import CreateButton from '../sections/CreateButton'
import DataStoreTabBar from '../sections/DataStoreTabBar'
import PageHeader from '../header/PageHeader'
import SearchField from '../sections/SearchField'
import ItemsTable from '../table/ItemsTable'

const NamespacesPage = () => {
    const navigate = useNavigate()
    const { store } = useParams()

    const data = {
        results: [
            'AUTO_CONFIG',
            'CLIMATE_DATA',
            'DHIS2_MAPS_APP',
            'METADATASTORE',
        ],
    }

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
                    Configure Namespaces
                </span>
            </PageHeader>

            <div className={classes.firstPageContainer}>
                <div>
                    <DataStoreTabBar
                        activeTab={activeTab}
                        switchTab={handleSwitchTab}
                    />
                </div>
                <div className={classes.midSection}>
                    <SearchField placeholder={i18n.t('Search namespaces')} />
                    <CreateButton
                        label={i18n.t('New Namespace')}
                        handleClick={() => console.log('create new namespace')}
                        icon={<IconAdd24 color={colors.grey600} />}
                    />
                </div>
                <div>
                    {data && (
                        <ItemsTable data={data} label={i18n.t('Namespace')} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default NamespacesPage
