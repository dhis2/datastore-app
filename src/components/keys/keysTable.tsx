import { useDataEngine, useDataQuery } from '@dhis2/app-runtime'
import {
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import DeleteButton from '../delete/DeleteButton'
import DeleteModal from '../delete/DeleteModal'
import CenteredLoader from '../Loader'

interface QueryResults {
    results: []
}

const fetchNamespaceQuery = ({ store }) => ({
    results: {
        resource: `${store}`,
        id: ({ id }) => id,
    },
})

const KeysTable = () => {
    const { store, namespace } = useParams()
    const navigate = useNavigate()
    const engine = useDataEngine()

    const { data, loading, refetch } = useDataQuery<QueryResults>(
        fetchNamespaceQuery({ store }),
        {
            variables: {
                id: namespace,
            },
        }
    )

    const [deleteNamespace, setDeleteNamespace] = useState(false)
    const [selectedKey, setSelectedKey] = useState('')
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        refetch({ id: namespace })
    }, [namespace])

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
                                        const url = `/${store}/edit/${namespace}/${key}`
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
                                                <DeleteButton
                                                    openModal={() => {
                                                        setOpenModal(true)
                                                        setDeleteNamespace(
                                                            data?.results
                                                                ?.length < 2
                                                        )
                                                        setSelectedKey(key)
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
                    deleteFn={() => handleDeleteAction(selectedKey)}
                    closeModal={() => setOpenModal(false)}
                >
                    <p>
                        {i18n.t(
                            `Are you sure you want to delete '${selectedKey}' in ${namespace}?`
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
