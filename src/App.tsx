import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import AppWrapper from './components/AppWrapper'
import { hashRouter } from './routes/Router'

const App: FC = () => {
    return (
        <AppWrapper>
            <RouterProvider router={hashRouter} />
        </AppWrapper>
    )
}

export default App
