import React from 'react'
import { render } from '../../../utils/test-utils'
import DeleteAction from '../DeleteAction'

it('Delete action', () => {
    const { debug } = render(
        <DeleteAction handleDeleteBtnClick={() => jest.fn()} />
    )

    debug()
})
