import React from 'react'
import SearchField from '../SearchField'
import { render } from '@testing-library/react'
import { RenderWrapper } from '../../../utils/test-utils'

it('TextField', () => {
    const { debug } = render(

   
        <RenderWrapper>
        <SearchField searchTerm='' setSearchTerm={() => jest.fn()} />
        </RenderWrapper>)

    debug()
})
