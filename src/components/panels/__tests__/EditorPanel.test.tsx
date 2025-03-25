import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import EditorPanel from '../EditorPanel'

it('Editor Panel', () => {
    const { debug } = renderComponentWithRouter(<EditorPanel />)

    debug()
})
