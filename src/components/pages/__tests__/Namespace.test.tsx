import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import NamespacesPage from '../Namespaces'

it('Edit', () => {
    const { debug } = renderComponentWithRouter(<NamespacesPage />)

    debug()
})
