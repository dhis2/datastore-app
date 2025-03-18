import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { ReactElement } from 'react'

export const customRender = (ui: ReactElement) => {
    return {
        user: userEvent.setup(),
        ...render(ui, {}),
    }
}
