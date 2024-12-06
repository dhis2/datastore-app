import { useDataQuery } from '@dhis2/app-service-data'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PanelHeader } from './PanelHeader'
import SidebarPanel from './SidebarPanel'

interface QueryResults {
    results: []
}

const dataStoreQuery = {
    results: {
        resource: 'dataStore',
        id: ({ id }) => id,
    },
}

const userDataStoreQuery = {
    results: {
        resource: 'userDataStore',
        id: ({ id }) => id,
    },
}

const KeysSidePanel = () => {
    // const navigate = useNavigate()
    const { store, namespace } = useParams()
    // const [option, setOption] = useState(store || '')

    const RenderDataStoreKeys = () => {
        const {
            error: dataStoreQueryError,
            loading: dataStoreQueryLoading,
            data: dataStoreQueryData,
            refetch: refetchDataStore,
        } = useDataQuery<QueryResults>(dataStoreQuery, {
            variables: {
                id: namespace,
            },
        })

        useEffect(() => {
            refetchDataStore()
        }, [store])

        return (
            <SidebarPanel
                data={dataStoreQueryData}
                error={dataStoreQueryError}
                loading={dataStoreQueryLoading}
                refetchList={refetchDataStore}
                type="keys"
            />
        )
    }

    const RenderUserDataStoreKeys = () => {
        const {
            error: userDataStoreQueryError,
            loading: userDataStoreQueryLoading,
            data: userDataStoreQueryData,
            refetch: refetchUserDataStore,
        } = useDataQuery<QueryResults>(userDataStoreQuery, {
            variables: {
                id: namespace,
            },
        })

        useEffect(() => {
            refetchUserDataStore()
        }, [store])

        return (
            <SidebarPanel
                data={userDataStoreQueryData}
                error={userDataStoreQueryError}
                loading={userDataStoreQueryLoading}
                refetchList={refetchUserDataStore}
                type="keys"
            />
        )
    }

    return (
        <>
            {namespace && (
                <>
                    <PanelHeader>
                        <>
                            {' '}
                            <b>{namespace}</b>
                        </>
                    </PanelHeader>

                    {store && (
                        <>
                            {store === 'userDataStore' && (
                                <RenderUserDataStoreKeys />
                            )}
                            {store === 'dataStore' && <RenderDataStoreKeys />}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default KeysSidePanel
