import React from 'react'
import { render } from '../../../test-utils/render'
import DeleteAction from '../DeleteAction'

it('Delete action', () => {
    const { debug } = render(
        <DeleteAction handleDeleteBtnClick={() => jest.fn()} />
    )

    debug()
})
