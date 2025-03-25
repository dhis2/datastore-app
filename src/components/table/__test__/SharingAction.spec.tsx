import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import { useParams } from 'react-router-dom'
import { renderComponentWithRouter } from '../../../test-utils/render'
import SharingAction from '../SharingAction'

describe('Sharing action', () => {
    beforeEach(() => {
        const useParamsMock = useParams as jest.Mock
        useParamsMock.mockReturnValue({
            namespace: 'testNamespace',
        })
    })

    const useDataQueryMock = useDataQuery as jest.Mock

    it('renders loading indicator', () => {
        useDataQueryMock.mockReturnValue({
            loading: true,
            data: null,
            refetch: jest.fn(),
        })

        const { queryByTestId } = renderComponentWithRouter(
            <SharingAction dataStoreKey="testKey" />,
            {
                routePath: ':store/edit/:namespace',
                initialEntries: '/dataStore/edit/testNamespace',
            }
        )

        expect(queryByTestId('circular-loader')).toBeInTheDocument()
    })

    it('renders loading indicator', async () => {
        useDataQueryMock.mockReturnValue({
            loading: false,
            data: {
                metadata: {
                    id: 'ABC123',
                },
            },
            refetch: jest.fn(),
        })

        const { queryByTestId } = renderComponentWithRouter(
            <SharingAction dataStoreKey="testKey" />,
            {
                routePath: ':store/edit/:namespace',
                initialEntries: '/dataStore/edit/testNamespace',
            }
        )

        expect(queryByTestId('circular-loader')).not.toBeInTheDocument()

        const button = queryByTestId('sharing-action-button')

        expect(button).toBeInTheDocument()
    })
})
