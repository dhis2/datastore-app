import { useDataQuery } from '@dhis2/app-runtime'
import { within } from '@testing-library/dom'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { keysMockData } from '../../../test-utils/mocks'
import { renderComponentWithRouter } from '../../../test-utils/render'
import KeysPanel from '../KeysPanel'

describe('Keys Panel', () => {
    const navigateMock = jest.fn()
    const useDataQueryMock = useDataQuery as jest.Mock

    beforeEach(() => {
        const useNavigateMock = useNavigate as jest.Mock
        useNavigateMock.mockReturnValue(navigateMock)

        const useParamsMock = useParams as jest.Mock
        useParamsMock.mockReturnValue({
            store: 'dataStore',
            namespace: 'testNamespace',
            key: 'testKey',
        })
    })

    afterEach(() => jest.clearAllMocks())

    it('renders loading indicator', () => {
        useDataQueryMock.mockReturnValue({
            loading: true,
            error: undefined,
            data: null,
            refetch: jest.fn(),
        })
        const { getByTestId } = renderComponentWithRouter(<KeysPanel />, {
            routePath: ':store/edit/:namespace',
            initialEntries: '/dataStore/edit/testNamespace',
            customData: { dataStore: keysMockData },
        })

        expect(getByTestId('centered-loader')).toBeInTheDocument()
    })
    it('renders error notice', () => {
        useDataQueryMock.mockReturnValue({
            loading: null,
            error: new Error('A test error'),
            data: null,
            refetch: jest.fn(),
        })
        const { getByTestId } = renderComponentWithRouter(<KeysPanel />, {
            routePath: ':store/edit/:namespace',
            initialEntries: '/dataStore/edit/testNamespace',
            customData: { dataStore: keysMockData },
        })

        expect(getByTestId('error-notice')).toBeInTheDocument()
    })

    it('renders key panel components', async () => {
        useDataQueryMock.mockReturnValue({
            loading: null,
            error: null,
            data: keysMockData,
            refetch: jest.fn(),
        })
        const {
            queryByTestId,
            getByTestId,
            getByPlaceholderText,
            queryByText,
            user,
        } = renderComponentWithRouter(<KeysPanel />, {
            routePath: ':store/edit/:namespace',
            initialEntries: '/dataStore/edit/testNamespace',
            customData: { dataStore: keysMockData },
        })

        // keys panel header
        const keysPanelHeader = queryByTestId('keys-panel-header')
        expect(keysPanelHeader).toBeInTheDocument()
        expect(
            within(keysPanelHeader).getByText('DataStore')
        ).toBeInTheDocument()
        expect(
            within(keysPanelHeader).getByText('testNamespace')
        ).toBeInTheDocument()

        // new key button
        const newKeyButton = getByTestId('create-button')
        expect(within(newKeyButton).getByText('New Key')).toBeInTheDocument()

        // launch and close new key modal
        await user.click(newKeyButton)
        expect(queryByTestId('create-modal')).toBeInTheDocument()

        await user.click(queryByText('Cancel'))
        expect(queryByTestId('create-modal')).not.toBeInTheDocument()

        // search field
        const searchField = getByPlaceholderText('Search keys')

        // items table
        expect(queryByTestId('datastore-items-table')).toBeInTheDocument()
        expect(queryByTestId('items-column-header')).toBeInTheDocument()
        expect(queryByTestId('actions-column-header')).toBeInTheDocument()

        // search results
        await user.type(searchField, 'nonExistentKey')
        expect(queryByText('No items found')).toBeInTheDocument()

        await user.clear(searchField)

        await user.type(searchField, keysMockData.results[0])
        expect(queryByText('No items found')).not.toBeInTheDocument()
        expect(queryByText(keysMockData.results[0])).toBeInTheDocument()
        expect(queryByText(keysMockData.results[1])).not.toBeInTheDocument()

        // launch and close delete modal
        await user.click(queryByTestId('delete-action-button'))
        expect(queryByTestId('delete-modal')).toBeInTheDocument()
        await user.click(queryByText('Cancel'))
        expect(queryByTestId('delete-modal')).not.toBeInTheDocument()
    })
})
