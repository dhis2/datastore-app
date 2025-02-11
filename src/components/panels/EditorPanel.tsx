import React from 'react'
import { useParams } from 'react-router-dom'
import { DATASTORE, USERDATASTORE } from '../../constants/constants'
import EditSection from '../sections/EditSection'

const dataStoreKeyValuesQuery = {
    results: {
        resource: 'dataStore',
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
}

const userDataStoreKeyValuesQuery = {
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
            {store === DATASTORE && (
                <EditSection query={dataStoreKeyValuesQuery} />
            )}
            {store === USERDATASTORE && (
                <EditSection query={userDataStoreKeyValuesQuery} />
            )}
        </div>
    )
}

export default EditorPanel
