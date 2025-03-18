import React from 'react'
import { render } from '../../../utils/test-utils'
import EditSection from '../EditSection'

it('Edit Section', () => {
    const { debug } = render(
        <EditSection query={""} />
    )

    debug()
})
