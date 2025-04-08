import { within } from '@testing-library/dom'
import React from 'react'
import { DATASTORE, USERDATASTORE } from '../../../constants/constants'
import { render } from '../../../test-utils/render'
import DataStoreTabBar from '../DataStoreTabBar'

describe('DataStoreTabBar', () => {
    const switchTab = jest.fn()

    afterEach(() => jest.clearAllMocks())

    it('renders datastore tabs', () => {
        const { getAllByRole } = render(
            <DataStoreTabBar activeTab={''} switchTab={switchTab} />
        )

        const tabs = getAllByRole('tab')
        expect(tabs.length).toBe(2)

        const dataStoreTab = tabs[0]
        const userDataStoreTab = tabs[1]

        expect(
            within(dataStoreTab).queryByText('DataStore')
        ).toBeInTheDocument()
        expect(
            within(userDataStoreTab).queryByText('UserDataStore')
        ).toBeInTheDocument()

        expect(dataStoreTab.getAttribute('aria-selected')).toBe('false')
        expect(userDataStoreTab.getAttribute('aria-selected')).toBe('false')
    })

    it('calls switch tab function when clicking on a tab', async () => {
        const { getAllByRole, user } = render(
            <DataStoreTabBar activeTab={DATASTORE} switchTab={switchTab} />
        )

        const tabs = getAllByRole('tab')
        const dataStoreTab = tabs[0]
        const userDataStoreTab = tabs[1]

        expect(dataStoreTab.getAttribute('aria-selected')).toBe('true')
        expect(userDataStoreTab.getAttribute('aria-selected')).toBe('false')

        await user.click(userDataStoreTab)
        expect(switchTab).toHaveBeenCalledWith(USERDATASTORE)
    })
})
