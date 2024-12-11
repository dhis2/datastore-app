import { useDataMutation, useDataQuery } from '@dhis2/app-runtime'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditSection from '../components/sections/EditSection'
import useCustomAlert from '../hooks/useCustomAlert'
import i18n from '../locales'

const DSKeyValuesQuery = {
    results: {
        resource: 'dataStore',
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
}

const UserDSKeyValuesQuery = {
    results: {
        resource: 'userDataStore',
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
}

const modifyDSKeyMutation = {
    type: 'update' as const,
    resource: 'dataStore',
    id: ({ key, namespace }: { key: string; namespace: string }) =>
        `${namespace}/${key}`,
    data: ({ value }) => JSON.parse(value),
}

const modifyUserDSKeyMutation = {
    type: 'update' as const,
    resource: 'userDataStore',
    id: ({ key, namespace }: { key: string; namespace: string }) =>
        `${namespace}/${key}`,
    data: ({ value }) => JSON.parse(value),
}

const DataStoreEditSection = () => {
    const { store, key, namespace } = useParams()
    const {
        data,
        loading: queryLoading,
        error,
        refetch,
    } = useDataQuery(DSKeyValuesQuery, {
        variables: {
            key,
            namespace,
        },
    })

    console.log(data, 'data')

    const { showError, showSuccess } = useCustomAlert()

    const [updateKey, { loading: mutationLoading }] = useDataMutation(
        // @ts-expect-error("")
        modifyDSKeyMutation,
        {
            onComplete: () => {
                const message = i18n.t('Key updated successfully')
                showSuccess(message)
            },
            onError: (error) => {
                const message = i18n.t('There was an error updating the key', {
                    error: error.message,
                })
                showError(message)
            },
        }
    )

    useEffect(() => {
        refetch({
            key,
            namespace,
        })
    }, [store, namespace, key])

    return (
        <EditSection
            updateKey={updateKey}
            refetch={refetch}
            data={data}
            queryLoading={queryLoading}
            mutationLoading={mutationLoading}
            error={error}
        />
    )
}

const UserDataStoreEditSection = () => {
    const { store, key, namespace } = useParams()
    const {
        data,
        loading: queryLoading,
        error,
        refetch,
    } = useDataQuery(UserDSKeyValuesQuery, {
        variables: {
            key,
            namespace,
        },
    })

    const { showError, showSuccess } = useCustomAlert()

    const [updateKey, { loading: mutationLoading }] = useDataMutation(
        // @ts-expect-error("")
        modifyUserDSKeyMutation,
        {
            onComplete: () => {
                const message = i18n.t('Key updated successfully')
                showSuccess(message)
            },
            onError: (error) => {
                const message = i18n.t('There was an error updating the key', {
                    error: error.message,
                })
                showError(message)
            },
        }
    )

    useEffect(() => {
        refetch({
            key,
            namespace,
        })
    }, [store, namespace, key])

    return (
        <EditSection
            updateKey={updateKey}
            refetch={refetch}
            data={data}
            mutationLoading={mutationLoading}
            queryLoading={queryLoading}
            error={error}
        />
    )
}

const EditPage = () => {
    const { store } = useParams()

    return (
        <>
            {store === 'dataStore' && <DataStoreEditSection />}
            {store === 'userDataStore' && <UserDataStoreEditSection />}
        </>
    )
}

export default EditPage
