import { useDataQuery } from '@dhis2/app-service-data'
import { Card, Divider } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import LinksList from '../namespaces/LinksList'
import DataStoreSelect from './DataStoreSelect'
// import SearchField from './SearchField'

interface QueryResults {
    results: []
}

const userDataStoreQuery = {
    results: {
        resource: 'userDataStore',
    },
}

const dataStoreQuery = {
    results: {
        resource: 'dataStore',
    },
}

const Sidebar = () => {
    const navigate = useNavigate()
    const { store } = useParams()
    const [option, setOption] = useState(store || '')

    const {
        error: dataStoreQueryError,
        loading: dataStoreQueryLoading,
        data: dataStoreQueryData,
        refetch: refetchDataStore,
    } = useDataQuery<QueryResults>(dataStoreQuery)

    const {
        error: userDataStoreQueryError,
        loading: userDataStoreQueryLoading,
        data: userDataStoreQueryData,
        refetch: refetchUserDataStore,
    } = useDataQuery<QueryResults>(userDataStoreQuery)

    useEffect(() => {
        const storeOptions = ['dataStore', 'userDataStore']
        if (!storeOptions.includes(store)) {
            navigate('/dataStore')
        } else {
            setOption(store)
        }
    }, [store])

    const handleDataStoreSelect = ({ selected }) => {
        setOption(selected)
        navigate(`/${selected}`)
    }
    return (
        <Card className={classes.sidebarContent}>
            <div className={classes.select}>
                <DataStoreSelect
                    option={option}
                    handleChange={handleDataStoreSelect}
                />
            </div>
            <Divider />
            {store && (
                <>
                    {/* <SearchField /> */}
                    {store === 'userDataStore' && (
                        <LinksList
                            error={userDataStoreQueryError}
                            data={userDataStoreQueryData}
                            loading={userDataStoreQueryLoading}
                            refetchList={refetchUserDataStore}
                        />
                    )}
                    {store === 'dataStore' && (
                        <LinksList
                            error={dataStoreQueryError}
                            data={dataStoreQueryData}
                            loading={dataStoreQueryLoading}
                            refetchList={refetchDataStore}
                        />
                    )}
                </>
            )}
        </Card>
    )
}

export default Sidebar
