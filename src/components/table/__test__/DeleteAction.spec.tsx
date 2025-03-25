import React from 'react'
import { render } from '../../../test-utils/render'
import DeleteAction from '../DeleteAction'

it('Delete action', async () => {
    const handleClick = jest.fn()
    const { getByRole, getByTestId, user } = render(
        <DeleteAction handleDeleteBtnClick={handleClick} />
    )

    const button = getByRole('button')
    expect(getByTestId('delete-action-button')).toBe(button)
    await user.click(button)
    expect(handleClick).toHaveBeenCalled()
})
