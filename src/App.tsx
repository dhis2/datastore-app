import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import AppWrapper from './components/AppWrapper'
import { threePanelRouter } from './components/panel/routes/PanelRouter'
// import { router } from './routes/Router'

const App: FC = () => {
    return (
        <AppWrapper>
            {/* <RouterProvider router={router} /> */}
            <RouterProvider router={threePanelRouter} />
        </AppWrapper>
    )
}

export default App
