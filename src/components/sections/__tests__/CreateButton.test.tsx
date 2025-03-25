import { IconAdd16 } from '@dhis2/ui-icons'
import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import CreateButton from '../CreateButton'

it('Create Button', () => {
    const { debug } = renderComponentWithRouter(
        <CreateButton
            label={'Create'}
            handleClick={() => jest.fn()}
            icon={<IconAdd16 />}
        />
    )

    debug()
})
