import {
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import { DATASTORE } from '../../constants/constants'
import i18n from '../../locales'
import DeleteAction from './DeleteAction'
import SharingAction from './SharingAction'

interface ItemsTableProps {
    activeRow: string
    handleDeleteAction: (string) => void
    handleRowClick: (string) => void
    label: string
    tableData: string[]
}

const ItemsTable = ({
    activeRow,
    tableData,
    label,
    handleDeleteAction,
    handleRowClick,
}: ItemsTableProps) => {
    const { store, namespace: currentNamespace } = useParams()

    const showShareAction = Boolean(store === DATASTORE && currentNamespace)

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
                                                    handleRowClick(item)
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
                                                            handleDeleteAction(
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
