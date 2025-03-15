import React from 'react'
import { render } from '@testing-library/react'
import { RenderWrapper } from '../../../utils/test-utils'
import NamespacesPage from '../Namespaces'

it('Edit', () => {
    const { debug } = render(
        <RenderWrapper>
<NamespacesPage />
        </RenderWrapper>)
    

    debug()
})

