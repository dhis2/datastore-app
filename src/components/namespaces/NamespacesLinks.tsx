import React from 'react'
import { useParams } from 'react-router-dom'
import DataStoreLinks from './DataStoreLinks'
import UserDataStoreLinks from './UserDataStoreLinks'

const NameSpaceLinks = () => {
    const { store } = useParams()

    if (store === 'userDataStore') {
        return <UserDataStoreLinks />
    }

    if (store === 'dataStore') {
        return <DataStoreLinks />
    }
}

export default NameSpaceLinks
