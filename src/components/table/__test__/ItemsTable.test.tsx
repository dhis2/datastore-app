import React from 'react'
import { render } from '../../../utils/test-utils'
import ItemsTable from '../ItemsTable'

it('Items Table', () => {
    const { debug } = render(
        <ItemsTable  tableData={[]} label={"Test Table"} setOpenDeleteModal={() => jest.fn()} setSelectedItem={() => jest.fn()}/>
    )

    debug()
})
