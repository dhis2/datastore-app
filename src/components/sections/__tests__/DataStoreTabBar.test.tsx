import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
import DataStoreTabBar from '../DataStoreTabBar'

it('DataStoreTabBar', () => {
    const { debug } = renderComponentWithRouter(
        <DataStoreTabBar activeTab={''} switchTab={() => jest.fn()} />
    )

    debug()
})
