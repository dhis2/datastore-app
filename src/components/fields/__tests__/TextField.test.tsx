import React from 'react'
import { render } from '@testing-library/react'
import TextField from '../TextField'
import { RenderWrapper } from '../../../utils/test-utils'

it('TextField', () => {
    const { debug } = render(

   
        <RenderWrapper>
        <TextField name={"Test field"} label={"Test Field"} />
        </RenderWrapper>)

    debug()
})
