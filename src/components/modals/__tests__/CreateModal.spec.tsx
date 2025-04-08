import React from 'react'
import { itemNameOf255Characters } from '../../../test-utils/mocks'
import { render } from '../../../test-utils/render'
import CreateModal from '../CreateModal'

describe('Create Modal', () => {
    const handleCreate = jest.fn()
    const closeModal = jest.fn()

    const userInput = async ({ value, input, user }) => {
        expect(input.value).toBe('')
        await user.type(input, value)
        expect(input.value).toBe(value)
        await user.tab()
    }

    const clickAddButton = async ({ user, handleCreate, button }) => {
        await user.click(button)
        expect(handleCreate).not.toHaveBeenCalled()
    }

    const helperMessage = 'Alphanumeric characters only'
    const specialCharactersValidationMessage =
        'Special characters are not allowed in this field'
    const maxLengthValidationMessage =
        'Please enter a maximum of 255 characters'
    const noValueValidationMessage = 'Please provide a value'

    afterEach(() => jest.clearAllMocks())

    it('renders a new namespace modal', async () => {
        const { getAllByRole, user } = render(
            <CreateModal
                handleCreate={handleCreate}
                closeModal={closeModal}
                title="Test New Namespace Modal"
                type={'namespace'}
            />
        )

        const modalHeader = getAllByRole('heading')[0]
        expect(modalHeader.innerHTML).toBe('Test New Namespace Modal')

        const inputs = getAllByRole('textbox') as HTMLInputElement[]
        expect(inputs.length).toBe(2)

        const firstInput = inputs[0]
        expect(firstInput.value).toBe('')
        expect(firstInput.name).toBe('namespace')
        await user.type(firstInput, 'testNamespace')
        expect(firstInput.value).toBe('testNamespace')

        const secondInput = inputs[1]
        expect(secondInput.value).toBe('')
        expect(secondInput.name).toBe('key')
        await user.type(secondInput, 'testKey')
        expect(secondInput.value).toBe('testKey')

        const buttons = getAllByRole('button') as HTMLButtonElement[]
        expect(buttons.length).toBe(2)
        expect(buttons[0].textContent).toBe('Cancel')
        expect(buttons[1].textContent).toBe('Add')

        await user.click(buttons[1])
        expect(handleCreate).toHaveBeenCalledWith({
            key: 'testKey',
            namespace: 'testNamespace',
        })
    })

    it('renders a new key modal', async () => {
        const { getAllByRole, user } = render(
            <CreateModal
                handleCreate={handleCreate}
                closeModal={closeModal}
                title="Test New Key Modal"
                type={'key'}
            />
        )

        const modalHeader = getAllByRole('heading')[0]
        expect(modalHeader.innerHTML).toBe('Test New Key Modal')

        const inputs = getAllByRole('textbox') as HTMLInputElement[]
        expect(inputs.length).toBe(1)

        expect(inputs[0].value).toBe('')
        await user.type(inputs[0], 'testKey')
        expect(inputs[0].value).toBe('testKey')

        const buttons = getAllByRole('button') as HTMLButtonElement[]
        expect(buttons.length).toBe(2)
        expect(buttons[0].textContent).toBe('Cancel')
        expect(buttons[1].textContent).toBe('Add')

        await user.click(buttons[1])
        expect(handleCreate).toHaveBeenCalledWith({ key: 'testKey' })
    })

    it('closes the Create modal', async () => {
        const { getAllByRole, user } = render(
            <CreateModal
                handleCreate={handleCreate}
                closeModal={closeModal}
                title="Test New Modal"
                type={'namespace'}
            />
        )

        expect(closeModal).not.toHaveBeenCalled()
        expect(handleCreate).not.toHaveBeenCalled()

        const buttons = getAllByRole('button') as HTMLButtonElement[]
        expect(buttons.length).toBe(2)
        expect(buttons[0].textContent).toBe('Cancel')
        expect(buttons[1].textContent).toBe('Add')

        await user.click(buttons[0])
        expect(closeModal).toHaveBeenCalled()
    })

    it('handles validation of special chararacters', async () => {
        const { getAllByRole, queryByText, user } = render(
            <CreateModal
                handleCreate={handleCreate}
                closeModal={closeModal}
                title="Test New Modal"
                type={'key'}
            />
        )

        const input = getAllByRole('textbox')[0] as HTMLInputElement
        const addButton = getAllByRole('button')[1] as HTMLButtonElement

        expect(queryByText(helperMessage)).toBeInTheDocument()
        expect(
            queryByText(specialCharactersValidationMessage)
        ).not.toBeInTheDocument()

        await userInput({
            input: input,
            value: 'test-key-with_special_characters',
            user,
        })
        expect(
            queryByText(specialCharactersValidationMessage)
        ).toBeInTheDocument()

        await clickAddButton({
            user,
            handleCreate,
            button: addButton,
        })

        expect(handleCreate).not.toHaveBeenCalled()
    })

    it.skip('handles validation of long names', async () => {
        // test times out
        const { getAllByRole, queryByText, user } = render(
            <CreateModal
                handleCreate={handleCreate}
                closeModal={closeModal}
                title="Test New Modal"
                type={'key'}
            />
        )

        const input = getAllByRole('textbox')[0] as HTMLInputElement
        const addButton = getAllByRole('button')[1] as HTMLButtonElement

        expect(queryByText(maxLengthValidationMessage)).not.toBeInTheDocument()

        await userInput({
            input: input,
            value: itemNameOf255Characters.concat('1'),
            user,
        })

        expect(queryByText(maxLengthValidationMessage)).toBeInTheDocument()

        await clickAddButton({
            user,
            handleCreate,
            button: addButton,
        })

        expect(handleCreate).not.toHaveBeenCalled()
    })

    it('handles validation of empty value submission', async () => {
        const { getAllByRole, queryByText, user } = render(
            <CreateModal
                handleCreate={handleCreate}
                closeModal={closeModal}
                title="Test New Modal"
                type={'key'}
            />
        )

        expect(queryByText(helperMessage)).toBeInTheDocument()
        expect(queryByText(noValueValidationMessage)).not.toBeInTheDocument()

        const input = getAllByRole('textbox')[0] as HTMLInputElement
        const addButton = getAllByRole('button')[1] as HTMLButtonElement

        expect(input.value).toBe('')

        await clickAddButton({
            user,
            handleCreate,
            button: addButton,
        })

        expect(queryByText(noValueValidationMessage)).toBeInTheDocument()
        expect(handleCreate).not.toHaveBeenCalled()
    })

    it('handles creation of valid input value', async () => {
        const { getAllByRole, queryByText, user } = render(
            <CreateModal
                handleCreate={handleCreate}
                closeModal={closeModal}
                title="Test New Modal"
                type={'key'}
            />
        )

        expect(queryByText(helperMessage)).toBeInTheDocument()

        const input = getAllByRole('textbox')[0] as HTMLInputElement
        const addButton = getAllByRole('button')[1] as HTMLButtonElement

        await userInput({
            input: input,
            value: itemNameOf255Characters,
            user,
        })

        await user.click(addButton)
        expect(queryByText(maxLengthValidationMessage)).not.toBeInTheDocument()
        expect(
            queryByText(specialCharactersValidationMessage)
        ).not.toBeInTheDocument()
        expect(queryByText(noValueValidationMessage)).not.toBeInTheDocument()
        expect(handleCreate).toHaveBeenCalled()
    })
})
