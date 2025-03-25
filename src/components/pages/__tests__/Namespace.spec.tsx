import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { namespaceMockData } from '../../../test-utils/mocks'
import { renderComponentWithRouter } from '../../../test-utils/render'
import NamespacesPage from '../Namespaces'

describe('Namespaces Page', () => {
    const navigateMock = jest.fn()
    const useDataQueryMock = useDataQuery as jest.Mock
    beforeEach(() => {
        const useNavigateMock = useNavigate as jest.Mock
        useNavigateMock.mockReturnValue(navigateMock)

        const useParamsMock = useParams as jest.Mock
        useParamsMock.mockReturnValue({ store: 'dataStore' })
    })

    afterEach(() => jest.clearAllMocks())

    it('renders loading indicator', () => {
        useDataQueryMock.mockReturnValue({
            loading: true,
            error: undefined,
            data: null,
            refetch: jest.fn(),
        })
        const { getByTestId } = renderComponentWithRouter(<NamespacesPage />, {
            initialEntries: '/dataStore',
            routePath: ':store',
            customData: { dataStore: [], userDataStore: [] },
        })

        expect(getByTestId('centered-loader')).toBeInTheDocument()
    })

    it('renders error', () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: new Error('Test error'),
            data: null,
            refetch: jest.fn(),
        })
        const { getByTestId } = renderComponentWithRouter(<NamespacesPage />, {
            initialEntries: '/dataStore',
            routePath: ':store',
            customData: { dataStore: [], userDataStore: [] },
        })

        expect(getByTestId('error-notice')).toBeInTheDocument()
    })

    it('renders Namespaces Page components', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: undefined,
            data: namespaceMockData,
            refetch: jest.fn(),
        })
        const {
            getAllByRole,
            getByTestId,
            getByPlaceholderText,
            getByText,
            queryByTestId,
            user,
        } = renderComponentWithRouter(<NamespacesPage />, {
            initialEntries: '/dataStore',
            routePath: ':store',
            customData: { dataStore: namespaceMockData, userDataStore: [] },
        })

        const title = getByTestId('page-header')
        expect(title.textContent).toBe('Namespaces')

        expect(queryByTestId('datastore-tab-bar')).toBeInTheDocument()
        const tabs = getAllByRole('tab')
        expect(tabs).toHaveLength(2)

        expect(tabs[0].querySelector('span').textContent).toBe('DataStore')
        expect(tabs[0].className).toContain('selected')

        expect(tabs[1].querySelector('span').textContent).toBe('UserDataStore')
        expect(tabs[1].className).not.toContain('selected')

        // search field
        expect(getByPlaceholderText('Search namespaces')).toBeInTheDocument()
        // create button
        expect(getByText('New namespace')).toBeInTheDocument()
        // items table
        expect(queryByTestId('datastore-items-table')).toBeInTheDocument()
        expect(queryByTestId('items-column-header')).toBeInTheDocument()
        expect(queryByTestId('actions-column-header')).toBeInTheDocument()

        expect(getByText(namespaceMockData.results[0])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[1])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[2])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[3])).toBeInTheDocument()

        // switch tabs
        await user.click(tabs[1])
        expect(navigateMock).toHaveBeenCalledWith('/userDataStore')
        expect(tabs[0].className).not.toContain('selected')
        expect(tabs[1].className).toContain('selected')
    })

    it('handles create action', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: undefined,
            data: namespaceMockData,
            refetch: jest.fn(),
        })
        const { getByText, queryByTestId, queryByText, user } =
            renderComponentWithRouter(<NamespacesPage />, {
                initialEntries: '/dataStore',
                routePath: ':store',
                customData: { dataStore: [], userDataStore: [] },
            })
        const newNamespaceButton = getByText('New namespace')

        // launch and close new namespace modal
        await user.click(newNamespaceButton)
        expect(queryByTestId('create-modal')).toBeInTheDocument()

        await user.click(queryByText('Cancel'))
        expect(queryByTestId('create-modal')).not.toBeInTheDocument()
    })

    it('handles search action', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: undefined,
            data: namespaceMockData,
            refetch: jest.fn(),
        })
        const { getByPlaceholderText, getByText, queryByText, user } =
            renderComponentWithRouter(<NamespacesPage />, {
                initialEntries: '/dataStore',
                routePath: ':store',
                customData: { dataStore: [], userDataStore: [] },
            })

        const searchField = getByPlaceholderText('Search namespaces')

        // search for test namespace
        await user.type(searchField, 'testNamespace1')

        expect(getByText(namespaceMockData.results[0])).toBeInTheDocument()
        expect(
            queryByText(namespaceMockData.results[1])
        ).not.toBeInTheDocument()
        expect(
            queryByText(namespaceMockData.results[2])
        ).not.toBeInTheDocument()
        expect(
            queryByText(namespaceMockData.results[3])
        ).not.toBeInTheDocument()

        //  non-existent key
        await user.type(searchField, 'nonExistentKey')
        expect(queryByText('No items found')).toBeInTheDocument()

        await user.clear(searchField)
        expect(getByText(namespaceMockData.results[0])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[1])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[2])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[3])).toBeInTheDocument()
    })

    it('handles delete action', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: undefined,
            data: namespaceMockData,
            refetch: jest.fn(),
        })
        const { queryByTestId, queryByText, queryAllByTestId, user } =
            renderComponentWithRouter(<NamespacesPage />, {
                initialEntries: '/dataStore',
                routePath: ':store',
                customData: { dataStore: [], userDataStore: [] },
            })

        const deleteActions = queryAllByTestId('delete-action-button')

        // launch and close delete modal of first item
        await user.click(deleteActions[0])
        expect(queryByTestId('delete-modal')).toBeInTheDocument()
        expect(
            queryByText("Are you sure you want to delete 'testNamespace1'?")
        ).toBeInTheDocument()
        await user.click(queryByText('Cancel'))
        expect(queryByTestId('delete-modal')).not.toBeInTheDocument()
    })

    it('handles row click correctly', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: undefined,
            data: namespaceMockData,
            refetch: jest.fn(),
        })

        const { user, getByText } = renderComponentWithRouter(
            <NamespacesPage />,
            {
                routePath: ':store',
                initialEntries: '/dataStore',
                customData: { dataStore: namespaceMockData, userDataStore: [] },
            }
        )

        const row = getByText('testNamespace1')
        await user.click(row)

        expect(navigateMock).toHaveBeenCalledWith('edit/testNamespace1')
    })
})
