import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import EditSection from '../EditSection'

it('Edit Section', () => {
    const query = {
        results: {
            resource: '',
            id: ({ key, namespace }) => '',
        },
    }
    const { debug } = renderComponentWithRouter(<EditSection query={query} />)

    debug()
})
