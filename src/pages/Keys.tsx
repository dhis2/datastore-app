import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import {
    DataStoreKeys,
    UserDataStoreKeys,
} from '../components/sections/KeysSections'

const KeysPage = () => {
    const { store } = useParams()
    return (
        <>
            <Header />
            {store === 'dataStore' && <DataStoreKeys />}
            {store === 'userDataStore' && <UserDataStoreKeys />}
        </>
    )
}

export default KeysPage
