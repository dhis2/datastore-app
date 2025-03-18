import React from 'react'
import { render } from '../../../utils/test-utils'
import DataStoreTabBar from '../DataStoreTabBar'

it('DataStoreTabBar', () => {
    const { debug } = render(
       <DataStoreTabBar activeTab={''} switchTab={() => jest.fn()} />
    )

    debug()
})
