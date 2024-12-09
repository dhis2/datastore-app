import {
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableRow,
    TableBody,
    TableHead,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../locales'
import TableActions from './actions/TableActions'

type TableProps = {
    data: {
        results: string[]
    }
    label: string
}

const ItemsTable = ({ data, label }: TableProps) => {
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
                                            <DataTableCell bordered width="88%">
                                                {item}
                                            </DataTableCell>
                                            <DataTableCell bordered width="12%">
                                                <TableActions item={item} />
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
