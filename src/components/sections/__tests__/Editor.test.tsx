import React from 'react'
import { render } from '../../../utils/test-utils'
import Editor from '../Editor'

it('Editor', () => {
    const { debug } = render(
        <Editor value={""} />
    )

    debug()
})
