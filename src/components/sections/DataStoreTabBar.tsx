import { Tab, TabBar } from '@dhis2/ui'
import React from 'react'
import { DATASTORE, USERDATASTORE } from '../../constants/constants'
import i18n from '../../locales'

type DataStoreProps = {
    activeTab: string
    switchTab: (string) => void
}

export default function DataStoreTabBar({
    activeTab,
    switchTab,
}: Readonly<DataStoreProps>) {
    return (
        <TabBar>
            <Tab
                onClick={() => {
                    switchTab(DATASTORE)
                }}
                selected={activeTab === DATASTORE}
            >
                {i18n.t('DataStore')}
            </Tab>
            <Tab
                onClick={() => {
                    switchTab(USERDATASTORE)
                }}
                selected={activeTab === USERDATASTORE}
            >
                {' '}
                {i18n.t('UserDataStore')}
            </Tab>
        </TabBar>
    )
}
