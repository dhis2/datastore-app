import { Tab, TabBar } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

type DataStoreProps = {
    activeTab: string
    setActiveTab: (string) => void
}

export default function DataStoreTabBar({
    activeTab,
    setActiveTab,
}: DataStoreProps) {
    return (
        <TabBar>
            <Tab
                onClick={() => {
                    setActiveTab('dataStore')
                }}
                selected={activeTab === 'dataStore'}
            >
                {i18n.t('DataStore')}
            </Tab>
            <Tab
                onClick={() => {
                    setActiveTab('userDataStore')
                }}
                selected={activeTab === 'userDataStore'}
            >
                {' '}
                {i18n.t('User DataStore')}
            </Tab>
        </TabBar>
    )
}
