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
import { DATASTORE } from '../../constants/constants'
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
    const { store, namespace: currentNamespace, key } = useParams()

    const showShareAction = Boolean(store === DATASTORE && currentNamespace)

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
        <>
            {tableData && (
                <DataTable scrollHeight="75vh">
                    <TableHead>
                        <DataTableRow>
                            <DataTableColumnHeader
                                fixed
                                // @ts-expect-error - passing a string '0' to a boolean param
                                top={'0'}
                                width={currentNamespace ? '85%' : '90%'}
                            >
                                <span className={classes.columnHeader}>
                                    {label}
                                </span>
                            </DataTableColumnHeader>
                            <DataTableColumnHeader
                                fixed
                                // @ts-expect-error - passing a string '0' to a boolean param
                                top={'0'}
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
                                                large={!currentNamespace}
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
                                                    {showShareAction && (
                                                        <SharingAction
                                                            dataStoreKey={item}
                                                        />
                                                    )}
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
        </>
    )
}

export default ItemsTable
