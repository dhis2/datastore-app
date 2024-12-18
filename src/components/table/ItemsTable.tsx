import {
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import TableActions from './TableActions'

type TableProps = {
    data: {
        results: string[]
    }
    label: string
}

const ItemsTable = ({ data, label }: TableProps) => {
    const navigate = useNavigate()
    const { namespace: currentNamespace } = useParams()

    return (
        <div>
            {data && (
                <DataTable layout="fixed">
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
                        {data?.results?.length && (
                            <>
                                {data.results.map((item, index) => {
                                    return (
                                        <DataTableRow key={`${item}-${index}`}>
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
                                                <TableActions />
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
