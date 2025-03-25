import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import KeysPanel from '../KeysPanel'

it('Keys Panel', () => {
    const { debug } = renderComponentWithRouter(<KeysPanel />)

    debug()
})
