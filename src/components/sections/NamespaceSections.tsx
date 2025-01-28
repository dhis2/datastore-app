import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainSection from './MainSection'

interface QueryResults {
    results: []
}

const userDataStoreNamespacesQuery = {
    results: {
        resource: 'userDataStore',
    },
}

const dataStoreNamespacesQuery = {
    results: {
        resource: 'dataStore',
    },
}

export type FieldValues = {
    namespace?: string
    key?: string
}

export const DataStoreNamespaces = () => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const [values, setValues] = useState<FieldValues>({})
    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        dataStoreNamespacesQuery
    )

    const handleCreate = async () => {
        await engine.mutate({
            type: 'create',
            resource: `dataStore/${values?.namespace}/${values?.key}`,
            data: () => ({}),
        })
        refetch()
        navigate(`edit/${values?.namespace}`)
    }

    return (
        <MainSection
            error={error}
            loading={loading}
            data={data}
            sectionType="namespace"
            handleCreate={handleCreate}
            values={values}
            setValues={setValues}
            handleRefetch={() => refetch()}
        />
    )
}

export const UserDataStoreNamespaces = () => {
    const engine = useDataEngine()
    const navigate = useNavigate()
    const [values, setValues] = useState<FieldValues>({})
    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        userDataStoreNamespacesQuery
    )

    const handleCreate = async () => {
        await engine.mutate({
            type: 'create',
            resource: `userDataStore/${values?.namespace}/${values?.key}`,
            data: () => ({}),
        })
        refetch()
        navigate(`edit/${values?.namespace}`)
    }

    return (
        <MainSection
            data={data}
            sectionType="namespace"
            loading={loading}
            error={error}
            handleCreate={handleCreate}
            values={values}
            setValues={setValues}
            handleRefetch={() => refetch()}
        />
    )
}
