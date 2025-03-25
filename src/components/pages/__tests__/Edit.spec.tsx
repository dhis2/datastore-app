import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { keysMockData } from '../../../test-utils/mocks'
import { renderComponentWithRouter } from '../../../test-utils/render'
import EditPage from '../Edit'

describe('Edit Page', () => {
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
        const { getByTestId } = renderComponentWithRouter(<EditPage />, {
            customData: { dataStore: keysMockData },
            initialEntries: '/dataStore/edit/testNamespace',
            routePath: ':store/edit/:namespace',
        })

        expect(getByTestId('centered-loader')).toBeInTheDocument()
    })

    it('renders error', () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: new Error('Test Error'),
            data: null,
            refetch: jest.fn(),
        })
        const { getByTestId } = renderComponentWithRouter(<EditPage />, {
            customData: { dataStore: keysMockData },
            initialEntries: '/dataStore/edit/testNamespace',
            routePath: ':store/edit/:namespace',
        })

        expect(getByTestId('error-notice')).toBeInTheDocument()
    })

    it('Edit page panels', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: undefined,
            data: keysMockData,
            refetch: jest.fn(),
        })
        const { queryByTestId } = renderComponentWithRouter(<EditPage />, {
            customData: { dataStore: keysMockData },
            initialEntries: '/dataStore/edit/testNamespace/testKey',
            routePath: ':store/edit/:namespace/:key',
        })

        expect(queryByTestId('keys-panel')).toBeInTheDocument()
        expect(queryByTestId('editor-panel')).toBeInTheDocument()
    })
})
