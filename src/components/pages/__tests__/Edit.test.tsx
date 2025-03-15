import React from 'react'
import { render } from '@testing-library/react'
import EditPage from '../Edit'
import { RenderWrapper } from '../../../utils/test-utils'

it('Edit', () => {
    const { debug } = render(
        <RenderWrapper>
<EditPage />
        </RenderWrapper>)
    

    debug()
})
