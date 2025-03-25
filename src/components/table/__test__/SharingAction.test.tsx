import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import SharingAction from '../SharingAction'

it('Sharing action', () => {
    const { debug } = renderComponentWithRouter(
        <SharingAction dataStoreKey="" />
    )

    debug()
})
