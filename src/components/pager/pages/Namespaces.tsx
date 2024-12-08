import React, { useState } from 'react'
import i18n from '../../../locales'
import CreateButton from '../buttons/CreateButton'
import DataStoreTabBar from '../DataStoreTabBar'
import classes from '../Page.module.css'
import SearchField from '../SearchField'
import ItemsTable from '../Table'

const NamespacesPage = () => {
    const data = {
        results: ['tea', 'coffee', 'chocolate', 'rose'],
    }
    const userData = {
        results: ['milk', 'cheese', 'ghee', 'cream'],
    }

    const [activeTab, setActiveTab] = useState('dataStore')

    // question: fetch data outside? filter it inside? handling search

    const RenderMidSection = ({ data }: { data: { results: string[] } }) => {
        return (
            <>
                <div className={classes.midSection}>
                    <SearchField placeholder={i18n.t('Search namespaces')} />
                    <CreateButton
                        label={i18n.t('New Namespace')}
                        handleClick={() => console.log('create new namespace')}
                    />
                </div>
                <div>
                    <ItemsTable data={data} label={i18n.t('Namespace')} />
                </div>
            </>
        )
    }
    return (
        <>
            <div>
                <DataStoreTabBar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
            {activeTab === 'dataStore' && <RenderMidSection data={data} />}
            {activeTab === 'userDataStore' && (
                <RenderMidSection data={userData} />
            )}
        </>
    )
}

export default NamespacesPage
