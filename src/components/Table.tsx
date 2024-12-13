import { useDataEngine } from '@dhis2/app-runtime'
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
import useCustomAlert from '../hooks/useCustomAlert'
import i18n from '../locales'
import TableActions from './actions/TableActions'

type TableProps = {
    data: {
        results: string[]
    }
    label: string
    refetchList: () => void
}

const ItemsTable = ({ data, label, refetchList }: TableProps) => {
    const navigate = useNavigate()
    const engine = useDataEngine()
    const { store, namespace: currentNamespace } = useParams()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const { showError, showSuccess } = useCustomAlert()

    const isKeyPage = Boolean(store && currentNamespace)
    const isNamespacePage = Boolean(store && !currentNamespace)

    const onEditButtonClick = ({ selectedItem }) => {
        if (isKeyPage) {
            navigate(`${selectedItem}`)
        } else if (isNamespacePage) {
            navigate(`edit/${selectedItem}`)
        }
    }

    const onComplete = () => {
        const message = i18n.t('Key deleted successfully')
        showSuccess(message)
        setOpenDeleteModal(false)
    }

    const onError = () => {
        const message = i18n.t('There was an error deleting the key')
        showError(message)
    }

    const handleDelete = async ({ selectedItem }) => {
        let resource = `${store}`

        if (isNamespacePage) {
            await engine.mutate(
                {
                    type: 'delete' as const,
                    resource: resource,
                    id: selectedItem,
                },
                {
                    onComplete: onComplete,
                    onError: onError,
                }
            )
            refetchList()
        } else if (isKeyPage) {
            if (data?.results?.length > 1) {
                resource = `${resource}/${currentNamespace}`
                await engine.mutate(
                    {
                        type: 'delete' as const,
                        resource: resource,
                        id: selectedItem,
                    },
                    {
                        onComplete: onComplete,
                        onError: onError,
                    }
                )
                refetchList()
            } else {
                await engine.mutate(
                    {
                        type: 'delete' as const,
                        resource: resource,
                        id: currentNamespace,
                    },
                    {
                        onComplete: onComplete,
                        onError: onError,
                    }
                )
                navigate(`/${store}`)
            }
        }
    }

    return (
        <div>
            {data && (
                <DataTable layout="fixed">
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader width="88%">
                                <b>{label}</b>
                            </DataTableColumnHeader>
                            <DataTableColumnHeader width="12%">
                                <b>{i18n.t('Actions')}</b>
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        {data?.results?.length && (
                            <>
                                {data.results.map((item, index) => {
                                    return (
                                        <DataTableRow key={`${item}-${index}`}>
                                            <DataTableCell
                                                bordered
                                                width="88%"
                                                onClick={() => {
                                                    if (currentNamespace) {
                                                        navigate(`${item}`)
                                                    } else {
                                                        navigate(`edit/${item}`)
                                                    }
                                                }}
                                            >
                                                {item}
                                            </DataTableCell>
                                            <DataTableCell bordered width="12%">
                                                <TableActions
                                                    selectedItem={item}
                                                    rowsLength={
                                                        data.results.length
                                                    }
                                                    handleDeleteAction={
                                                        handleDelete
                                                    }
                                                    handleEditAction={
                                                        onEditButtonClick
                                                    }
                                                    openDeleteModal={
                                                        openDeleteModal
                                                    }
                                                    setOpenDeleteModal={
                                                        setOpenDeleteModal
                                                    }
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
        </div>
    )
}

export default ItemsTable
