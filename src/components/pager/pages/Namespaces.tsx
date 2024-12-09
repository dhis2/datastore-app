import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import i18n from '../../../locales'
import CreateAction from '../CreateAction'
import DataStoreTabBar from '../DataStoreTabBar'
import classes from '../Page.module.css'
import SearchField from '../SearchField'
import ItemsTable from '../table/Table'

const NamespacesPage = () => {
    const navigate = useNavigate()

    const data = {
        results: ['tea', 'coffee', 'chocolate', 'rose'],
    }
    const userData = {
        results: ['milk', 'cheese', 'ghee', 'cream'],
    }

    const [activeTab, setActiveTab] = useState('dataStore')

    const handleSwitchTab = (selectedTab) => {
        setActiveTab(selectedTab)
        navigate(`/${selectedTab}`)
    }
    // question: fetch data outside? filter it inside? handling search

    const RenderMidSection = ({ data }: { data: { results: string[] } }) => {
        return (
            <>
                <div className={classes.midSection}>
                    <SearchField placeholder={i18n.t('Search namespaces')} />
                    <CreateAction type={'namespace'} />
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
                    switchTab={handleSwitchTab}
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
