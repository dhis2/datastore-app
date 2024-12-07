import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import AppWrapper from './components/appWrapper'
import { pagerRouter } from './components/pager/routes/PagerRouter'
// import { router } from './routes/Router'

const App: FC = () => {
    return (
        <AppWrapper>
            {/* <RouterProvider router={router} /> */}
            <RouterProvider router={pagerRouter} />
        </AppWrapper>
    )
}

export default App
