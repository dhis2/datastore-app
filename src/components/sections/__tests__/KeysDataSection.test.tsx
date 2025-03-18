import React from 'react'
import { render } from '../../../utils/test-utils'
import KeysDataSection from '../KeysDataSection'

it('KeysDataSection', () => {
    const { debug } = render(
        <KeysDataSection query={""} />
    )

    debug()
})
// 