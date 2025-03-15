import React from 'react'
import KeysPanel from '../KeysPanel'
import { RenderWrapper } from '../../../utils/test-utils'
import { render } from '@testing-library/react'

it('Keys Panel', () => {
    const { debug } = render(
        <RenderWrapper>
    <KeysPanel />
    </RenderWrapper>)

    debug()
})
