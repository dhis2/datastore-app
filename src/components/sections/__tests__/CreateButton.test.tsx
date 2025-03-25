import React from 'react'
import { renderComponentWithRouter } from '../../../utils/test-utils'
import CreateButton from '../CreateButton'
import { IconAdd16 } from '@dhis2/ui-icons'

it('Create Button', () => {
    const { debug } = renderComponentWithRouter(
       <CreateButton label={"Create"} handleClick={() => jest.fn()} icon={<IconAdd16 />}/>
    )

    debug()
})
