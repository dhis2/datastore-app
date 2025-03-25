import React from 'react'
import { render } from '../../../test-utils/render'
import ItemsTable from '../ItemsTable'

it('Items Table', () => {
    const { debug } = render(
        <ItemsTable
            tableData={[]}
            label={'Test Table'}
            activeRow={'key1'}
            handleDeleteAction={() => jest.fn()}
            handleRowClick={() => jest.fn()}
        />
    )

    debug()
})
