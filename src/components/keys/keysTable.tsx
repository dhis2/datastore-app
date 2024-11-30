import { useDataQuery } from '@dhis2/app-runtime'
import {
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

const Keys = () => {
    const { store, namespace } = useParams()
    const { data, refetch } = useNameSpaceQuery({ store, namespace })

    useEffect(() => {
        refetch({ id: namespace })
    }, [namespace])

    return <KeysTable data={data} />
}

export const KeysTable = ({ data }) => {
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
                                <DataTableCell>{key}</DataTableCell>
                                <DataTableCell>Edit, Delete</DataTableCell>
                            </DataTableRow>
                        ))}
                    </>
                )}
            </TableBody>
        </DataTable>
    )
}

KeysTable.propTypes = {
    data: PropTypes.object,
}

export default Keys
