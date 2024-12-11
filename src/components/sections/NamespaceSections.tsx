import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import React, { useState } from 'react'
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
        // navigate(`${store}/edit/${values?.namespace}/${values?.key}`)
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
        />
    )
}

export const UserDataStoreNamespaces = () => {
    const engine = useDataEngine()
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
        // navigate(`${store}/edit/${values?.namespace}/${values?.key}`)
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
        />
    )
}
