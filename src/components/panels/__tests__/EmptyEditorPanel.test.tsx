import React from 'react'
import EmptyEditorPanel from '../EmptyEditorPanel'
import { RenderWrapper } from '../../../utils/test-utils'
import { render } from '@testing-library/react'

it('Empy Editor Panel', () => {
    const { debug } = render(
        <RenderWrapper>
    <EmptyEditorPanel />
    </RenderWrapper>)

    debug()
})
