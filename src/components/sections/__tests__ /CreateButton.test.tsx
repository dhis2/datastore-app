import { IconAdd16 } from '@dhis2/ui-icons'
import React from 'react'
import { customRender } from '../../../test-utils/render'
import CreateButton from '../CreateButton'

it('renders Create Button', async () => {
    const handleClick = jest.fn()
    const { user, getByRole } = customRender(
        <CreateButton
            label={'Create'}
            handleClick={handleClick}
            icon={<IconAdd16 />}
        />
    )
    const button = getByRole('button')
    await user.click(button)
    expect(button.textContent).toBe('Create')
    expect(handleClick).toHaveBeenCalled()
})
