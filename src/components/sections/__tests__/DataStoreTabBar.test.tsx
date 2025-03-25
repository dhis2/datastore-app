import React from 'react'
import { renderComponentWithRouter } from '../../../utils/test-utils'
import DataStoreTabBar from '../DataStoreTabBar'

it('DataStoreTabBar', () => {
    const { debug } = renderComponentWithRouter(
       <DataStoreTabBar activeTab={''} switchTab={() => jest.fn()} />
    )

    debug()
})
