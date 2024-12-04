import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import {
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import DeleteModal from '../delete/DeleteModal'
import CenteredLoader from '../Loader'
import DeleteAction from './DeleteAction'

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
    const navigate = useNavigate()
    const engine = useDataEngine()
    const { data, loading, refetch } = useNameSpaceQuery({ store, namespace })
    const [deleteNamespace, setDeleteNamespace] = useState(false)
    const [deleteKey, setDeleteKey] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const handleDeleteAction = async (key) => {
        await engine.mutate({
            type: 'delete',
            resource: `${store}/${namespace}`,
            id: key,
        })
        setOpenModal(false)

        if (deleteNamespace) {
            navigate(`/${store}`)
        } else {
            refetch({ id: namespace })
        }
    }

    if (loading) {
        return <CenteredLoader />
    }

    return (
        <div className={classes.keysTable}>
            {data && (
                <DataTable>
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader>Keys</DataTableColumnHeader>
                            <DataTableColumnHeader>
                                Actions
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        {data?.results?.length && (
                            <>
                                {data.results.map((key, index) => {
                                    const handleClick = () => {
                                        const url = `/${store}/${namespace}/edit/${key}`
                                        navigate(url)
                                    }

                                    return (
                                        <DataTableRow key={`${key}-${index}`}>
                                            <DataTableCell
                                                bordered
                                                onClick={handleClick}
                                            >
                                                {key}
                                            </DataTableCell>
                                            <DataTableCell bordered>
                                                <DeleteAction
                                                    openModal={() => {
                                                        setOpenModal(true)
                                                        setDeleteNamespace(
                                                            data?.results
                                                                ?.length < 2
                                                        )
                                                        setDeleteKey(key)
                                                    }}
                                                />
                                            </DataTableCell>
                                        </DataTableRow>
                                    )
                                })}
                            </>
                        )}
                    </TableBody>
                </DataTable>
            )}
            {openModal && (
                <DeleteModal
                    deleteFn={() => handleDeleteAction(deleteKey)}
                    closeModal={() => setOpenModal(false)}
                >
                    <p>
                        {i18n.t(
                            `Are you sure you want to delete '${deleteKey}' in ${namespace}?`
                        )}
                    </p>
                    {deleteNamespace && (
                        <p>
                            {i18n.t(
                                `This will also delete the namespace '${namespace}'`
                            )}
                        </p>
                    )}
                </DeleteModal>
            )}
        </div>
    )
}

export default KeysTable
