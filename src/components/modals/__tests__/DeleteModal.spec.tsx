import React from 'react'
import { render } from '../../../test-utils/render'
import DeleteModal from '../DeleteModal'

describe('Delete Modal', () => {
    const handleDelete = jest.fn()
    const closeModal = jest.fn()
    const testNamespace = 'testNamespace'
    const testKey = 'testKey'

    afterEach(() => jest.clearAllMocks())
    it('renders a delete namespace modal', async () => {
        const { getByRole, getAllByRole, queryByText, user } = render(
            <DeleteModal
                handleDelete={handleDelete}
                closeModal={closeModal}
                title="Test Delete Namespace Modal"
                type={'namespace'}
                activeNamespace={testNamespace}
            />
        )
        const modalHeader = getByRole('heading')
        expect(modalHeader.innerHTML).toBe('Test Delete Namespace Modal')

        const buttons = getAllByRole('button') as HTMLButtonElement[]
        expect(buttons.length).toBe(2)
        expect(buttons[0].textContent).toBe('Cancel')
        expect(buttons[1].textContent).toBe('Delete')

        const confirmationMessage = `Are you sure you want to delete '${testNamespace}'?`

        expect(queryByText(confirmationMessage)).toBeInTheDocument()

        await user.click(buttons[1])
        expect(handleDelete).toHaveBeenCalled()
    })

    it('renders a delete key modal', async () => {
        const { getByRole, getAllByRole, queryByText, user } = render(
            <DeleteModal
                handleDelete={handleDelete}
                closeModal={closeModal}
                title="Test Delete Key Modal"
                type={'key'}
                activeNamespace={testNamespace}
                activeKey={testKey}
            />
        )
        const modalHeader = getByRole('heading')
        expect(modalHeader.innerHTML).toBe('Test Delete Key Modal')

        const buttons = getAllByRole('button') as HTMLButtonElement[]
        expect(buttons.length).toBe(2)
        expect(buttons[0].textContent).toBe('Cancel')
        expect(buttons[1].textContent).toBe('Delete')

        const confirmationMessage = `Are you sure you want to delete '${testKey}' in ${testNamespace}?`

        expect(queryByText(confirmationMessage)).toBeInTheDocument()

        await user.click(buttons[1])
        expect(handleDelete).toHaveBeenCalled()
    })

    it('calls the close modal function when cancel button is clicked', async () => {
        const { getAllByRole, user } = render(
            <DeleteModal
                handleDelete={handleDelete}
                closeModal={closeModal}
                title="Test Delete Key Modal"
                type={'key'}
                activeNamespace={testNamespace}
                deleteNamespace
            />
        )
        const buttons = getAllByRole('button') as HTMLButtonElement[]
        expect(buttons.length).toBe(2)
        expect(buttons[0].textContent).toBe('Cancel')
        expect(buttons[1].textContent).toBe('Delete')

        await user.click(buttons[0])
        expect(closeModal).toHaveBeenCalled()
    })
})
