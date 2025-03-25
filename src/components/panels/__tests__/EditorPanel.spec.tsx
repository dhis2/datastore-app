import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { keysValueMockData } from '../../../test-utils/mocks'
import { renderComponentWithRouter } from '../../../test-utils/render'
import EditorPanel from '../EditorPanel'

describe('Editor Panel', () => {
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
        const { queryByTestId } = renderComponentWithRouter(<EditorPanel />, {
            routePath: ':store/edit/:namespace/:key',
            initialEntries: '/dataStore/edit/testNamespace/testKey',
            customData: { dataStore: keysValueMockData },
        })

        expect(queryByTestId('editor-loader')).toBeInTheDocument()
    })

    it('renders editor panel components', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            error: undefined,
            data: keysValueMockData,
            refetch: jest.fn(),
        })
        const { getByTestId, queryByTestId } = renderComponentWithRouter(
            <EditorPanel />,
            {
                routePath: ':store/edit/:namespace/:key',
                initialEntries: '/dataStore/edit/testNamespace/testKey',
                customData: { dataStore: keysValueMockData },
            }
        )

        expect(queryByTestId('editor-loader')).not.toBeInTheDocument()

        const panelLabel = getByTestId('editor-panel-key-label')
        expect(panelLabel.textContent).toBe('testKey')

        const closeButton = getByTestId('close-editor-button')
        expect(closeButton.textContent).toBe('Close')
        const saveButton = getByTestId('save-changes-button')
        expect(saveButton.textContent).toBe('Save changes')

        expect(queryByTestId('editor')).toBeInTheDocument()
    })
})
