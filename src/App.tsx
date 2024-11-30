import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import AppWrapper from './components/AppWrapper'
import { router } from './routes/Router'

const App: FC = () => {
    return (
        <AppWrapper>
            <RouterProvider router={router} />
        </AppWrapper>
    )
}

export default App
