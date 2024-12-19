import React from 'react'
import { useParams } from 'react-router-dom'
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
    const { store } = useParams()

    return (
        <>
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
