import React from 'react'
import { render } from '../../../utils/test-utils'
import NamespaceDataSection from '../NamespaceDataSection'

it('KeysDataSection', () => {
    const { debug } = render(
        <NamespaceDataSection query={""} />
    )

    debug()
})
