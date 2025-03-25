import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import EditPage from '../Edit'

it('Edit', () => {
    const { debug } = renderComponentWithRouter(<EditPage />)

    debug()
})
