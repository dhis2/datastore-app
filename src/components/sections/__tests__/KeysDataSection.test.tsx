import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import KeysDataSection from '../KeysDataSection'

it('KeysDataSection', () => {
    const query = { results: { resource: '', id: ({ id }) => '' } }

    const { debug } = renderComponentWithRouter(
        <KeysDataSection query={query} />
    )

    debug()
})
//
