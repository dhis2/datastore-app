import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import AppWrapper from './components/appWrapper'
import { threePanelRouter } from './routes/PanelRouter'

const App: FC = () => {
    return (
        <AppWrapper>
            <RouterProvider router={threePanelRouter} />
        </AppWrapper>
    )
}

export default App
