import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import EmptyEditorPanel from '../EmptyEditorPanel'

it('Empy Editor Panel', () => {
    const { debug } = renderComponentWithRouter(<EmptyEditorPanel />)

    debug()
})
