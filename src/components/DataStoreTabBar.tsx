import { Tab, TabBar } from '@dhis2/ui'
import React from 'react'
import i18n from '../locales'

type DataStoreProps = {
    activeTab: string
    switchTab: (string) => void
}

export default function DataStoreTabBar({
    activeTab,
    switchTab,
}: DataStoreProps) {
    return (
        <TabBar>
            <Tab
                onClick={() => {
                    switchTab('dataStore')
                }}
                selected={activeTab === 'dataStore'}
            >
                {i18n.t('DataStore')}
            </Tab>
            <Tab
                onClick={() => {
                    switchTab('userDataStore')
                }}
                selected={activeTab === 'userDataStore'}
            >
                {' '}
                {i18n.t('User DataStore')}
            </Tab>
        </TabBar>
    )
}
