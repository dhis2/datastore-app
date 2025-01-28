import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import AppWrapper from './components/appWrapper'
import { router } from './routes/router'

const App: FC = () => {
    return (
        <AppWrapper>
            <RouterProvider router={router} />
        </AppWrapper>
    )
}

export default App
