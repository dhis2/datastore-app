import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainSection from './MainSection'

interface QueryResults {
    results: []
}

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

type FieldValue = {
    key?: string
}

export const DataStoreKeys = () => {
    const engine = useDataEngine()
    const { namespace: currentNamespace } = useParams()
    const [values, setValues] = useState<FieldValue>({})

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        dataStoreKeysQuery,
        {
            variables: {
                id: currentNamespace,
            },
        }
    )

    const handleCreate = async () => {
        await engine.mutate({
            type: 'create',
            resource: `dataStore/${currentNamespace}/${values?.key}`,
            data: () => ({}),
        })
        refetch({ id: currentNamespace })
        setValues({})
        // navigate(`dataStore/edit/${currentNamespace}/${values?.key}`)
    }

    useEffect(() => {
        refetch({ id: currentNamespace })
    }, [currentNamespace])

    return (
        <MainSection
            data={data}
            handleCreate={handleCreate}
            loading={loading}
            error={error}
            sectionType="key"
            values={values}
            setValues={setValues}
        />
    )
}

export const UserDataStoreKeys = () => {
    const engine = useDataEngine()
    const [values, setValues] = useState<FieldValue>({})
    const { namespace: currentNamespace } = useParams()

    const { error, loading, data, refetch } = useDataQuery<QueryResults>(
        userDataStoreKeysQuery,
        {
            variables: {
                id: currentNamespace,
            },
        }
    )

    const handleCreate = async () => {
        await engine.mutate({
            type: 'create',
            resource: `userDataStore/${currentNamespace}/${values?.key}`,
            data: () => ({}),
        })
        refetch({ id: currentNamespace })
        setValues({})
        // navigate(`userDataStore/edit/${currentNamespace}/${values?.key}`)
    }

    useEffect(() => {
        refetch({ id: currentNamespace })
    }, [currentNamespace])

    return (
        <MainSection
            data={data}
            handleCreate={handleCreate}
            loading={loading}
            error={error}
            sectionType="key"
            values={values}
            setValues={setValues}
        />
    )
}
