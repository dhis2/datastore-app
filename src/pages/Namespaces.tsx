import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataStoreTabBar from '../components/DataStoreTabBar'
import {
    DataStoreNamespaces,
    UserDataStoreNamespaces,
} from '../components/sections/NamespaceSections'

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
        if (!storeOptions.includes(store)) {
            navigate('/dataStore')
        } else {
            setActiveTab(store)
        }
    }, [store])

    return (
        <>
            <div>
                <DataStoreTabBar
                    activeTab={activeTab}
                    switchTab={handleSwitchTab}
                />
            </div>
            {activeTab === 'dataStore' && <DataStoreNamespaces />}
            {activeTab === 'userDataStore' && <UserDataStoreNamespaces />}
        </>
    )
}

export default NamespacesPage
