import React from 'react'
import { render } from '../../../utils/test-utils'
import SharingAction from '../SharingAction'

it('Sharing action', () => {
    const { debug } = render(
        <SharingAction dataStoreKey='' />
    )

    debug()
})
