import React from 'react'
import { useParams } from 'react-router-dom'
import { namespaceMockData } from '../../../test-utils/mocks'
import { renderComponentWithRouter } from '../../../test-utils/render'
import ItemsTable from '../ItemsTable'

describe('Items Table', () => {
    const useParamsMock = useParams as jest.Mock
    beforeEach(() => {
        useParamsMock.mockReturnValue({
            store: 'userDataStore',
            namespace: 'testNamespace',
        })
    })

    afterEach(() => jest.clearAllMocks())

    it('renders empty items table', () => {
        const { queryByTestId, queryByText } = renderComponentWithRouter(
            <ItemsTable
                tableData={[]}
                label={'Test Table'}
                activeRow={null}
                handleDeleteAction={() => jest.fn()}
                handleRowClick={() => jest.fn()}
            />
        )

        expect(queryByTestId('datastore-items-table')).toBeInTheDocument()
        expect(queryByTestId('items-column-header')).toBeInTheDocument()
        expect(queryByText('Test Table')).toBeInTheDocument()
        expect(queryByTestId('actions-column-header')).toBeInTheDocument()
        expect(queryByText('Actions')).toBeInTheDocument()
        expect(queryByText('No items found')).toBeInTheDocument()
    })

    it('renders items table with content', () => {
        const { getByText, queryAllByTestId, queryByTestId, queryByText } =
            renderComponentWithRouter(
                <ItemsTable
                    tableData={namespaceMockData.results}
                    label={'Test Table'}
                    activeRow={'testNamespace1'}
                    handleDeleteAction={() => jest.fn()}
                    handleRowClick={() => jest.fn()}
                />
            )

        const table = queryByTestId('datastore-items-table')

        expect(table).toBeInTheDocument()
        expect(queryByTestId('items-column-header')).toBeInTheDocument()
        expect(queryByText('Test Table')).toBeInTheDocument()
        expect(queryByTestId('actions-column-header')).toBeInTheDocument()
        expect(queryByText('Actions')).toBeInTheDocument()

        expect(getByText(namespaceMockData.results[0])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[1])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[2])).toBeInTheDocument()
        expect(getByText(namespaceMockData.results[3])).toBeInTheDocument()

        const deleteActions = queryAllByTestId('delete-action-button')
        expect(deleteActions.length).toBe(namespaceMockData.results.length)
    })
})
