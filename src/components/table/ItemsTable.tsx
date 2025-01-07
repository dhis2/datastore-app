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
import DeleteAction from './DeleteAction'
import SharingAction from './SharingAction'

interface ItemsTableProps {
    tableData: string[]
    label: string
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}

const ItemsTable = ({
    tableData,
    label,
    setOpenDeleteModal,
    setSelectedItem,
}: ItemsTableProps) => {
    const navigate = useNavigate()
    const { namespace: currentNamespace, key } = useParams()

    const [activeRow, setActiveRow] = useState(key || null)

    const handleDeleteBtnClick = (item) => {
        setOpenDeleteModal(true)
        setSelectedItem(item)
        setActiveRow(item)
    }

    useEffect(() => {
        setActiveRow(key)
    }, [key])

    return (
        <div>
            {tableData && (
                <DataTable layout="fixed" scrollHeight="75vh">
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader
                                width={currentNamespace ? '85%' : '90%'}
                            >
                                <span className={classes.columnHeader}>
                                    {label}
                                </span>
                            </DataTableColumnHeader>
                            <DataTableColumnHeader
                                width={currentNamespace ? '15%' : '10%'}
                            >
                                <span className={classes.columnHeader}>
                                    {i18n.t('Actions')}
                                </span>
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.length ? (
                            <>
                                {tableData.map((item, index) => {
                                    return (
                                        <DataTableRow
                                            key={`${item}-${index}`}
                                            selected={item === activeRow}
                                        >
                                            <DataTableCell
                                                bordered
                                                width={
                                                    currentNamespace
                                                        ? '85%'
                                                        : '90%'
                                                }
                                                onClick={() => {
                                                    if (currentNamespace) {
                                                        navigate(`${item}`)
                                                    } else {
                                                        navigate(`edit/${item}`)
                                                    }
                                                    setActiveRow(item)
                                                }}
                                            >
                                                {item}
                                            </DataTableCell>
                                            <DataTableCell
                                                bordered
                                                width={
                                                    currentNamespace
                                                        ? '15%'
                                                        : '10%'
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.actionButtons
                                                    }
                                                >
                                                    <SharingAction />
                                                    <DeleteAction
                                                        handleDeleteBtnClick={() =>
                                                            handleDeleteBtnClick(
                                                                item
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </DataTableCell>
                                        </DataTableRow>
                                    )
                                })}
                            </>
                        ) : (
                            <DataTableRow>
                                <DataTableCell bordered>
                                    {i18n.t('No items found')}
                                </DataTableCell>
                            </DataTableRow>
                        )}
                    </TableBody>
                </DataTable>
            )}
        </div>
    )
}

export default ItemsTable
