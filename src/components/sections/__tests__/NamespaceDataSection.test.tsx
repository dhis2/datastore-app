import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import NamespaceDataSection from '../NamespaceDataSection'

it('KeysDataSection', () => {
    const query = { results: { resource: '' } }
    const { debug } = renderComponentWithRouter(
        <NamespaceDataSection query={query} />
    )

    debug()
})
