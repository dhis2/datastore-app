import { IconAdd16, colors } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import PanelHeader from '../header/PanelHeader'
import CreateButton from '../sections/CreateButton'
import KeysDataSection from '../sections/KeysDataSection'

const userDataStoreKeysQuery = {
    results: {
        resource: 'userDataStore',
        id: ({ id }) => id,
    },
}

const dataStoreKeysQuery = {
    results: {
        resource: 'dataStore',
        id: ({ id }) => id,
    },
}

const KeysPanel = () => {
    const { namespace, store } = useParams()

    return (
        <>
            <PanelHeader>
                <span className={classes.keysPanelHeader}>
                    {namespace} {i18n.t('keys')}
                </span>
                <CreateButton
                    label={i18n.t('New Key')}
                    handleClick={() => console.log('create new key')}
                    icon={<IconAdd16 color={colors.grey600} />}
                />
            </PanelHeader>
            {store === 'dataStore' && (
                <KeysDataSection query={dataStoreKeysQuery} />
            )}
            {store === 'userDataStore' && (
                <KeysDataSection query={userDataStoreKeysQuery} />
            )}
        </>
    )
}

export default KeysPanel
