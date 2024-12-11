import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreateAction from '../components/actions/CreateAction'
import DataStoreTabBar from '../components/DataStoreTabBar'
import SearchField from '../components/SearchField'
import ItemsTable from '../components/Table'
import i18n from '../locales'
import classes from '../Page.module.css'

const NamespacesPage = () => {
    const navigate = useNavigate()
    const { store } = useParams()

    const data = {
        results: ['tea', 'coffee', 'chocolate', 'rose'],
    }
    const userData = {
        results: ['milk', 'cheese', 'ghee', 'cream'],
    }

    const [activeTab, setActiveTab] = useState(store || 'dataStore')

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
