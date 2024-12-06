import { useDataQuery } from '@dhis2/app-service-data'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PanelHeader } from './PanelHeader'
import DataStoreControl from './sidepanel/DataStoreControl'
import SidebarPanel from './sidepanel/SidePanel'

interface QueryResults {
    results: []
}

const dataStoreQuery = {
    results: {
        resource: 'dataStore',
    },
}

const userDataStoreQuery = {
    results: {
        resource: 'userDataStore',
    },
}

const NamespacesPanel = () => {
    const navigate = useNavigate()
    const { store } = useParams()
    const [option, setOption] = useState(store || 'dataStore')

    const RenderUserDataStorePanel = () => {
        const {
            error: userDataStoreQueryError,
            loading: userDataStoreQueryLoading,
            data: userDataStoreQueryData,
            refetch: refetchUserDataStore,
        } = useDataQuery<QueryResults>(userDataStoreQuery)

        useEffect(() => {
            refetchUserDataStore()
        }, [store])

        return (
            <SidebarPanel
                data={userDataStoreQueryData}
                error={userDataStoreQueryError}
                loading={userDataStoreQueryLoading}
                refetchList={refetchUserDataStore}
                type="namespace"
            />
        )
    }

    const RenderDataStorePanel = () => {
        const {
            error: dataStoreQueryError,
            loading: dataStoreQueryLoading,
            data: dataStoreQueryData,
            refetch: refetchDataStore,
        } = useDataQuery<QueryResults>(dataStoreQuery)

        useEffect(() => {
            refetchDataStore()
        }, [store])

        return (
            <SidebarPanel
                data={dataStoreQueryData}
                error={dataStoreQueryError}
                loading={dataStoreQueryLoading}
                refetchList={refetchDataStore}
                type="namespace"
            />
        )
    }

    const handleDataStoreSelect = ({ value }) => {
        setOption(value)
        navigate(`/${value}`)
    }

    console.log('store', store)
    useEffect(() => {
        const storeOptions = ['dataStore', 'userDataStore']
        // console.log("store", store)
        if (!storeOptions.includes(store)) {
            navigate('/dataStore')
        } else {
            setOption(store)
        }
    }, [store])

    return (
        <>
            <PanelHeader>
                <DataStoreControl
                    option={option}
                    handleChange={handleDataStoreSelect}
                />
            </PanelHeader>
            {store === 'userDataStore' && <RenderUserDataStorePanel />}
            {store === 'dataStore' && <RenderDataStorePanel />}
        </>
    )
}

export default NamespacesPanel
