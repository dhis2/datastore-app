import React from 'react'
import EditorPanel from '../EditorPanel'
import { render } from '@testing-library/react'
import { RenderWrapper } from '../../../utils/test-utils'

it('Editor Panel', () => {
    const { debug } = render(
    <RenderWrapper><EditorPanel /></RenderWrapper>)

    debug()
})
