import { useDataQuery } from '@dhis2/app-runtime'
import {
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CenteredLoader from '../Loader'

interface QueryResults {
    results: []
}

const useNameSpaceQuery = ({ store, namespace }) => {
    return useDataQuery<QueryResults>(
        {
            results: {
                resource: `${store}`,
                id: ({ id }) => id,
            },
        },
        {
            variables: {
                id: namespace,
            },
        }
    )
}

const KeysTable = () => {
    const { store, namespace } = useParams()
    const { data, loading, refetch } = useNameSpaceQuery({ store, namespace })

    useEffect(() => {
        refetch({ id: namespace })
    }, [namespace])

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>Keys</DataTableColumnHeader>
                    <DataTableColumnHeader>Actions</DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                {data?.results?.length && (
                    <>
                        {data.results.map((key, index) => (
                            <DataTableRow key={`${key}-${index}`}>
                                <DataTableCell bordered>{key}</DataTableCell>
                                <DataTableCell bordered>
                                    Edit, Delete
                                </DataTableCell>
                            </DataTableRow>
                        ))}
                    </>
                )}
            </TableBody>
        </DataTable>
    )
}

export default KeysTable
