import React from 'react'
import { useParams } from 'react-router-dom'
import EditSection from '../sections/EditSection'

const DataStoreKeyValuesQuery = {
    results: {
        resource: 'dataStore',
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
}

const UserDataStoreKeyValuesQuery = {
    results: {
        resource: 'userDataStore',
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
}

const EditorPanel = () => {
    const { store } = useParams()

    return (
        <div>
            {store === 'dataStore' && (
                <EditSection query={DataStoreKeyValuesQuery} />
            )}
            {store === 'userDataStore' && (
                <EditSection query={UserDataStoreKeyValuesQuery} />
            )}
        </div>
    )
}

export default EditorPanel
